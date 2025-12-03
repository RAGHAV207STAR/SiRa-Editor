
"use client";

import { useEffect, useState, useCallback } from 'react';
import { useEditor, type EditorState, type ImageWithDimensions, type Photo } from '@/context/editor-context';
import UploadStep from './steps/upload-step';
import PreviewStep from './steps/preview-step';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { GoogleSpinner } from '../ui/google-spinner';
import SelectCopiesStep from './steps/select-copies-step';
import { AnimatePresence, motion } from 'framer-motion';
import { 
    DndContext, 
    DragEndEvent, 
    DragStartEvent, 
    DragOverlay,
    PointerSensor, 
    TouchSensor, 
    KeyboardSensor, 
    useSensor, 
    useSensors, 
    closestCenter 
} from '@dnd-kit/core';
import Image from 'next/image';

interface Photosheet {
  id: string;
  thumbnailUrl: string; 
  copies: number;
  editorState: EditorState;
}

interface EditorWizardProps {
  historyId: string | null;
  copies: string | null;
}

export type WizardStep = 'select-copies' | 'upload-photos' | 'page-setup';

const DraggableItemPreview = ({ item }: { item: ImageWithDimensions | Photo }) => {
    const src = 'imageSrc' in item ? item.imageSrc : item.src;
    if (!src) return null;

    return (
        <div className="w-24 h-24 relative cursor-grabbing rounded-lg overflow-hidden shadow-2xl bg-white border-2 border-primary transform rotate-6">
            <Image src={src} alt="Dragging item" fill className="object-cover" />
        </div>
    );
};


export default function EditorWizard({ historyId, copies: copiesParam }: EditorWizardProps) {
  const [step, setStep] = useState<WizardStep>('select-copies');
  const [activeDragItem, setActiveDragItem] = useState<ImageWithDimensions | Photo | null>(null);
  const { 
      setEditorState, 
      setCopies: setEditorCopies, 
      resetEditor,
      images,
      photos,
      swapPhotoItems,
      placeImageInSlot,
  } = useEditor();

  const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(TouchSensor, {
        // Press delay of 150ms, with a tolerance of 5px of movement
        activationConstraint: {
          delay: 150,
          tolerance: 5,
        },
      }),
      useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const isFromUploadedList = active.data.current?.isFromUploadedList;

    if (isFromUploadedList) {
        const image = images.find(img => img.src === active.id);
        if (image) setActiveDragItem(image);
    } else {
        const photo = photos.flat().find(p => p.id.toString() === active.id.toString());
        if (photo) setActiveDragItem(photo);
    }
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
      setActiveDragItem(null);
      const { active, over } = event;
  
      if (!over) return;
  
      const activeId = active.id.toString();
      const overId = over.id.toString();
  
      if (activeId === overId) return;
  
      const isDraggingFromUploadedList = active.data.current?.isFromUploadedList;
  
      if (isDraggingFromUploadedList) {
        const imageToPlace = images.find(img => img.src === activeId);
        if (imageToPlace) {
          placeImageInSlot(imageToPlace.src, parseInt(overId, 10));
        }
      } else {
        swapPhotoItems(parseInt(activeId, 10), parseInt(overId, 10));
      }
  };

  const firestore = useFirestore();
  const { user } = useUser();
  
  const photosheetDocRef = useMemoFirebase(() => {
      if (!firestore || !historyId || !user) return null;
      return doc(firestore, 'users', user.uid, 'photosheets', historyId);
  }, [firestore, historyId, user]);

  const { data: photosheet, isLoading } = useDoc<Photosheet>(photosheetDocRef);

  useEffect(() => {
    if (historyId) {
      // Loading from history, wait for data.
      return;
    }

    if (!historyId && !copiesParam) {
      resetEditor();
      setStep('select-copies');
    } else if (copiesParam) {
      const parsedCopies = parseInt(copiesParam, 10);
      resetEditor(); // Reset first to ensure clean state
      if (!isNaN(parsedCopies)) {
        setEditorCopies(parsedCopies);
        setStep('upload-photos');
      } else {
        setStep('select-copies');
      }
    }
  }, [historyId, copiesParam, resetEditor, setEditorCopies]);


  useEffect(() => {
    if (historyId && photosheet && photosheet.editorState) {
        setEditorState(photosheet.editorState);
        setStep('page-setup');
    }
  }, [historyId, photosheet, setEditorState]);

  const goTo = (nextStep: WizardStep) => setStep(nextStep);
  
  if (historyId && isLoading) {
    return (
       <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
        <GoogleSpinner />
        <p className="text-muted-foreground font-semibold">Loading from History...</p>
      </div>
    )
  }
  
  const renderStep = () => {
      const onContinue = () => goTo('page-setup');
      const onBackToUpload = () => goTo('upload-photos');
      const onBackToCopies = () => goTo('select-copies');

      switch (step) {
          case 'select-copies':
              return <SelectCopiesStep onContinue={() => goTo('upload-photos')} />;
          case 'upload-photos':
              return <UploadStep onContinue={onContinue} onBack={onBackToCopies} />;
          case 'page-setup':
              return <PreviewStep onBack={onBackToUpload} />;
          default:
              return <SelectCopiesStep onContinue={() => goTo('upload-photos')} />;
      }
  }

  return (
    <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col flex-grow bg-background">
          <AnimatePresence mode="wait">
              <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="flex-grow flex flex-col"
              >
                  {renderStep()}
              </motion.div>
          </AnimatePresence>
      </div>
       <DragOverlay>
            {activeDragItem ? <DraggableItemPreview item={activeDragItem} /> : null}
       </DragOverlay>
    </DndContext>
  );
}

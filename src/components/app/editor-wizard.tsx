
"use client";

import { useEffect, useState, useCallback } from 'react';
import { useEditor, type EditorState } from '@/context/editor-context';
import UploadStep from './steps/upload-step';
import PreviewStep from './steps/preview-step';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { GoogleSpinner } from '../ui/google-spinner';
import SelectCopiesStep from './steps/select-copies-step';
import { AnimatePresence, motion } from 'framer-motion';
import { DndContext, DragEndEvent, PointerSensor, TouchSensor, KeyboardSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core';

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

export default function EditorWizard({ historyId, copies: copiesParam }: EditorWizardProps) {
  const [step, setStep] = useState<WizardStep>('select-copies');
  const { 
      setEditorState, 
      setCopies: setEditorCopies, 
      resetEditor,
      images,
      swapPhotoItems,
      placeImageInSlot,
  } = useEditor();

  const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
      useSensor(KeyboardSensor)
  );
  
  const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;
  
      if (!over) return;
  
      const activeId = active.id.toString();
      const overId = over.id.toString();
  
      if (activeId === overId) return;
  
      const isDraggingFromUploadedList = !!(active.data.current?.isFromUploadedList);
  
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
      // If we're loading from history, we wait for the data to be fetched.
      // The loading spinner will be shown.
      return;
    }

    // This logic runs when not loading from history.
    if (!historyId && !copiesParam) {
      resetEditor();
      setStep('select-copies');
    } else if (copiesParam) {
      const parsedCopies = parseInt(copiesParam, 10);
      if (!isNaN(parsedCopies)) {
        resetEditor(); // Reset first to ensure clean state
        setEditorCopies(parsedCopies);
        setStep('upload-photos');
      } else {
        resetEditor();
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
              return <SelectCopiesStep onContinue={onContinue} />;
          case 'upload-photos':
              return <UploadStep onContinue={onContinue} onBack={onBackToCopies} />;
          case 'page-setup':
              return <PreviewStep onBack={onBackToUpload} />;
          default:
              return <SelectCopiesStep onContinue={onContinue} />;
      }
  }

  return (
    <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
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
    </DndContext>
  );
}


"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';
import type { Photo } from '@/context/editor-context';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEditor } from '@/context/editor-context';

interface PhotoItemProps {
  photo: Photo;
}

export function PhotoItem({ 
  photo, 
}: PhotoItemProps) {

  const { selectedPhotoId, setSelectedPhotoId, borderWidth, borderColor } = useEditor();
  const isSelected = selectedPhotoId === photo.id;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isOver,
    isDragging,
  } = useSortable({
      id: photo.id.toString(),
      data: {
          type: 'photo',
          photo,
      }
  });

  const style: React.CSSProperties = {
      transform: CSS.Transform.toString(transform),
      transition,
      position: 'absolute',
      left: `${photo.x}%`,
      top: `${photo.y}%`,
      width: `${photo.width}%`,
      height: `${photo.height}%`,
      opacity: isDragging ? 0 : 1,
      zIndex: isDragging ? 20 : (isSelected ? 10 : 1),
  };

  const textVerticalAlignClass = {
    'top': 'justify-start',
    'middle': 'justify-center',
    'bottom': 'justify-end'
  }[photo.textVerticalAlign];

  const textAlignClass = {
    'left': 'text-left',
    'center': 'text-center',
    'right': 'text-right'
  }[photo.textAlign];

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPhotoId(photo.id);
  };


  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      data-photo-id={photo.id}
      className={cn(
          'photo-item group transition-all duration-200', 
          isSelected && !isDragging && 'ring-2 ring-primary ring-offset-2',
          isOver && !isDragging && 'drag-over'
      )}
      onClick={handleSelect}
    >
      {photo.imageSrc ? (
         <div
          style={{
            borderWidth: `${borderWidth}px`,
            borderColor: borderColor,
          }}
          className='w-full h-full border-black relative overflow-hidden'
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={photo.imageSrc} 
            alt={`Photo ${photo.id}`} 
            className={cn(
              "photo-preview pointer-events-none w-full h-full",
              photo.fit === 'cover' ? 'object-cover' : 'object-contain'
            )}
          />
          {photo.text && (
            <div 
              className={cn(
                "absolute inset-0 p-1 flex flex-col pointer-events-none",
                textVerticalAlignClass
              )}
            >
              <div
                className={cn("w-full", textAlignClass)}
                style={{
                  color: photo.textColor,
                  fontSize: `${photo.fontSize}%`,
                  lineHeight: '1.2',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                }}
              >
                {photo.text}
              </div>
            </div>
          )}

        </div>
      ) : (
        <div className="w-full h-full border-dashed border-slate-300" style={{borderWidth: '2px'}}>
          <div className="placeholder-icon flex items-center justify-center h-full w-full no-print">
            <ImageIcon className="h-6 w-6 text-gray-400" />
          </div>
        </div>
      )}
    </div>
  );
};


const SheetPreview = React.forwardRef<HTMLDivElement, { photos: Photo[] }>(({ photos }, ref) => {
  const { 
    currentSheet, 
    setSelectedPhotoId
  } = useEditor();

  const handleBackgroundClick = () => {
    setSelectedPhotoId(null);
  }

  return (
    <div ref={ref} id={`sheet-${currentSheet}`} className="printable-area w-full h-full relative bg-white" onClick={handleBackgroundClick}>
      {photos.map((photo) => {
        return (
          <PhotoItem 
            key={photo.id} 
            photo={photo}
          />
        )
      })}
      
      {photos.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-muted-foreground p-4 no-print">
            <ImageIcon className="h-12 w-12 mb-4" />
            <h3 className="text-lg font-semibold">A4 Preview</h3>
            <p className="text-sm max-w-xs mx-auto">Your photosheet layout will appear here. Adjust settings to generate a layout.</p>
          </div>
      )}
    </div>
  );
});

SheetPreview.displayName = "SheetPreview";
export default React.memo(SheetPreview);

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button, Card } from './';
import { cn } from '../utils';
import { textStyles, THEME_CONSTANTS } from '../theme';

const Modal = ({ 
  isOpen = false,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = '',
  ...props 
}) => {
  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Cerrar con Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-full mx-4'
  };

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={handleOverlayClick}
      {...props}
    >
      <Card 
        variant="elevated" 
        className={cn(
          'w-full relative animate-scale-in',
          sizes[size],
          className
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {title && (
              <h2 className={textStyles.h4}>
                {title}
              </h2>
            )}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2 hover:bg-gray-100"
                icon={<X className="w-4 h-4" />}
              />
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </Card>
    </div>
  );
};

// Subcomponentes del Modal
const ModalHeader = ({ children, className = '', ...props }) => (
  <div className={cn('mb-4', className)} {...props}>
    {children}
  </div>
);

const ModalTitle = ({ children, className = '', ...props }) => (
  <h2 className={cn(textStyles.h4, className)} {...props}>
    {children}
  </h2>
);

const ModalSubtitle = ({ children, className = '', ...props }) => (
  <p className={cn(textStyles.body2, 'mt-1', className)} {...props}>
    {children}
  </p>
);

const ModalBody = ({ children, className = '', ...props }) => (
  <div className={cn('mb-6', className)} {...props}>
    {children}
  </div>
);

const ModalFooter = ({ children, className = '', ...props }) => (
  <div className={cn('flex justify-end space-x-3 pt-4 border-t border-gray-200', className)} {...props}>
    {children}
  </div>
);

// Asignar subcomponentes
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Subtitle = ModalSubtitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;

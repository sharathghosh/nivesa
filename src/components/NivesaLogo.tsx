'use client';

// This component provides a solution for rendering the Nivesa logo correctly
export default function NivesaLogo({ size = 'text-4xl', className = '' }: { size?: string, className?: string }) {
  return (
    <span className={`font-bold ${size} ${className}`}>
      <span style={{ fontFamily: 'Arial, sans-serif' }}>न</span>
      <span className="font-lora">ive</span>
      {/* Using a different approach for ś character */}
      <span className="font-lora" dangerouslySetInnerHTML={{ __html: '&#347;a' }} />
    </span>
  );
}

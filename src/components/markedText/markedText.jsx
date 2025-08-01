import styles from './markedText.module.css';

/**
 * MarkedText component - adds an orange rounded background highlight behind text
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The text content to highlight
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {Object} [props.style] - Inline styles to apply
 * @param {string} [props.variant='default'] - Highlight variant ('default', 'large', 'small')
 * @returns {JSX.Element} MarkedText component
 */
export default function MarkedText({ 
  children, 
  className = '', 
  style = {}, 
  variant = 'default',
  ...props 
}) {
  const variantClass = styles[`highlight--${variant}`] || styles['highlight--default'];
  
  return (
    <span 
      className={`${styles.highlight} ${variantClass} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </span>
  );
} 
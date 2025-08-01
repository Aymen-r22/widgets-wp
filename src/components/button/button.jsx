import React from 'react'
import styles from './button.module.css'

export default function Button({
    children,
    leftIcon,
    rightIcon,
    rightIconStyle = {},
    leftIconStyle = {},
    rightIconClassName = '',
    leftIconClassName = '',
    variant = 'none', // none, primary, secondary
    important, // standard, important
    grayed = false,
    className = '',
    iconStyle = {},
    textStyle = {},
    iconClassName = '',
    textClassName = '',
    style = {},
    onClick = undefined,
    size = 'md',
    ...props
}) {
    // Generate the button's className based on props
    const getButtonClassName = () => {
        const classes = [styles.button];

        // Add any custom size first (before icon padding adjustments)
        if (size) {
            const capitalizedSize = size.charAt(0).toUpperCase() + size.slice(1);
            classes.push(styles[`button${capitalizedSize}`]);
        }

        // Add variant class
        if (important) {
            classes.push(styles[`${variant}Important`]);
        } else if (variant === 'none') {
            classes.push(styles.none);
        } else {
            classes.push(styles[variant]);
        }

        // Add icon padding adjustments
        if (leftIcon) {
            classes.push(styles.buttonWithLeftIcon);
        }

        if (rightIcon) {
            classes.push(styles.buttonWithRightIcon);
        }

        // Add grayed class if needed
        if (grayed) {
            classes.push(styles.grayed);
        }

        // Add any custom className
        if (className) {
            classes.push(className);
        }

        return classes.join(' ');
    };

    // Render icon based on type (JSX element or component reference)
    const renderIcon = (icon, position) => {
        if (!icon) return null;

        // First apply base icon styles, then specific position styles if provided
        const specificStyle = position === 'left' ? leftIconStyle : rightIconStyle;
        const combinedIconStyles = {
            ...iconStyle,
            ...specificStyle
        };

        // First apply base icon className, then specific position className if provided
        const specificClassName = position === 'left' ? leftIconClassName : rightIconClassName;
        const combinedIconClassName = `${styles.icon} ${iconClassName} ${specificClassName}`.trim();

        // If icon is a React element (JSX), clone it with the styles
        if (React.isValidElement(icon)) {
            return React.cloneElement(icon, {
                style: { ...icon.props?.style, ...combinedIconStyles },
                className: combinedIconClassName ? `${icon.props?.className || ''} ${combinedIconClassName}`.trim() : icon.props?.className
            });
        }

        // If icon is a component reference, render it with the styles as props
        const IconComponent = icon;
        return (
            <IconComponent
                style={combinedIconStyles}
                className={combinedIconClassName}
            />
        );
    };

    const combinedTextClassName = `${styles.text} ${textClassName}`.trim();

    return (
        <button
            className={getButtonClassName()}
            style={style}
            onClick={grayed ? undefined : onClick}
            disabled={grayed}
            {...props}
        >
            {renderIcon(leftIcon, 'left')}

            {children && (
                <span
                    className={combinedTextClassName}
                    style={textStyle}
                >
                    {children}
                </span>
            )}

            {renderIcon(rightIcon, 'right')}
        </button>
    )
}

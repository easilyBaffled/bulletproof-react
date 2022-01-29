import { forwardRef } from 'react';
import clsx from 'clsx';
import { Spinner } from '@/components/Elements/Spinner';

const variants = {
    danger:  'bg-red-600 text-white hover:bg-red-50:text-red-600',
    inverse: 'bg-white text-blue-600 hover:bg-blue-600:text-white',
    primary: 'bg-blue-600 text-white hover:bg-gray-50:text-blue-600'
};

const sizes = {
    lg: 'py-3 px-8 text-lg',
    md: 'py-2 px-6 text-md',
    sm: 'py-2 px-4 text-sm'
};

export const Button = forwardRef(
    (
        {
            type = 'button',
            className = '',
            variant = 'primary',
            size = 'md',
            isLoading = false,
            startIcon,
            endIcon,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                type={type}
                className={clsx(
                    'flex justify-center items-center border border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none',
                    variants[ variant ],
                    sizes[ size ],
                    className
                )}
                {...props}
            >
                {isLoading && <Spinner size="sm" className="text-current" />}
                {!isLoading && startIcon}
                <span className="mx-2">{props.children}</span>{' '}
                {!isLoading && endIcon}
            </button>
        );
    }
);
Button.displayName = 'Button';

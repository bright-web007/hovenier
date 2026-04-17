'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './GardenerDirectory.module.css'

interface Option {
  value: string
  label: string
}

interface CustomSelectProps {
  id: string
  label: string
  options: Option[]
  value: string
  onChange: (value: string) => void
  className?: string,
  outerClassName?: string,
  variant?: 'default' | 'form'
}

const formTriggerStyle: React.CSSProperties = {
  background: 'var(--cream)',
  borderWidth: '0.5px',
  borderStyle: 'solid',
  borderColor: 'var(--border-med)',
  borderRadius: '3px',
  fontSize: '13px',
  padding: '11px 14px',
}

const formTriggerOpenStyle: React.CSSProperties = {
  background: '#fff',
  borderWidth: '0.5px',
  borderStyle: 'solid',
  borderColor: 'var(--forest)',
  borderRadius: '3px',
  fontSize: '13px',
  padding: '11px 14px',
}

const formDropdownStyle: React.CSSProperties = {
  borderRadius: '3px',
  fontSize: '13px',
}

const formOptionStyle: React.CSSProperties = {
  fontSize: '13px',
  padding: '10px 14px',
}

export default function CustomSelect({ id, label, options, value, onChange, variant = 'default', className, outerClassName }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selectedLabel = options.find((o) => o.value === value)?.label || label

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`${styles.customSelect} ${outerClassName || ''}`} ref={ref}>
      <button
        id={id}
        type="button"
        className={`${styles.customSelectTrigger} ${isOpen ? styles.customSelectOpen : ''} ${className || ''}`}
        style={variant === 'form' ? (isOpen ? formTriggerOpenStyle : formTriggerStyle) : undefined}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span
          className={value ? styles.customSelectValueActive : styles.customSelectValue}
          style={variant === 'form' ? { color: value ? 'var(--text)' : '#b8c4b0' } : undefined}
        >
          {selectedLabel}
        </span>
        <svg
          className={`${styles.customSelectChevron} ${isOpen ? styles.customSelectChevronUp : ''}`}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {isOpen && (
        <ul
          className={styles.customSelectDropdown}
          role="listbox"
          aria-labelledby={id}
          style={variant === 'form' ? formDropdownStyle : undefined}
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={`${styles.customSelectOption} ${option.value === value ? styles.customSelectOptionActive : ''}`}
              style={variant === 'form' ? formOptionStyle : undefined}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

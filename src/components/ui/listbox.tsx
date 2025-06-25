'use client'

import { Listbox, ListboxItem, ListboxSection, Selection } from '@heroui/react'
import { useState } from 'react'

export interface ListBoxOption {
    key: string
    label: string
    description?: string
    disabled?: boolean
    startContent?: React.ReactNode
    endContent?: React.ReactNode
}

interface CustomListBoxProps {
    label?: string
    options: ListBoxOption[]
    defaultSelectedKey?: string
    selectionMode?: 'single' | 'multiple'
    onChange?: (selectedKeys: Set<string>) => void
    disabledKeys?: string[]
    topContent?: React.ReactNode
    bottomContent?: React.ReactNode
    emptyContent?: React.ReactNode
    variant?: 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow'
    color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
    classNames?: Partial<Record<'base' | 'list' | 'emptyContent', string>>
    itemClasses?: Partial<Record<'base' | 'wrapper' | 'title' | 'description' | 'selectedIcon', string>>
}

export default function CustomListBox({
    label,
    options,
    defaultSelectedKey,
    selectionMode = 'single',
    onChange,
    disabledKeys = [],
    topContent,
    bottomContent,
    emptyContent = <p>No items.</p>,
    variant = 'solid',
    color = 'default',
    classNames = {},
    itemClasses = {}
}: CustomListBoxProps) {
    const [selectedKeys, setSelectedKeys] = useState<Selection>(
        defaultSelectedKey ? new Set([defaultSelectedKey]) : new Set()
    )
    const handleSelectionChange = (keys: Selection) => {
        const newKeys = keys === 'all'
            ? new Set<string>()
            : new Set(Array.from(keys).map(String))

        setSelectedKeys(newKeys)
        onChange?.(newKeys)
    }

    return (
        <div className="w-full max-w-sm">
            {label && <label className="block mb-2 text-sm font-medium">{label}</label>}

            <Listbox
                aria-label={label || 'Listbox'}
                selectionMode={selectionMode}
                selectedKeys={selectedKeys}
                onSelectionChange={handleSelectionChange}
                disabledKeys={disabledKeys}
                topContent={topContent}
                bottomContent={bottomContent}
                emptyContent={emptyContent}
                variant={variant}
                color={color}
                classNames={classNames}
                itemClasses={itemClasses}
            >
                {options.map(({ key, label, description, disabled, startContent, endContent }) => (
                    <ListboxItem
                        key={key}
                        description={description}
                        isDisabled={disabled}
                        startContent={startContent}
                        endContent={endContent}
                    >
                        {label}
                    </ListboxItem>
                ))}
            </Listbox>
        </div>
    )
}

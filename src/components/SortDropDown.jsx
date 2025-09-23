import React from 'react'
import * as Select from '@radix-ui/react-select'
import { ChevronDownIcon, CheckIcon } from '@radix-ui/react-icons'

function SortDropDown({ sortOrder = 'asc', onSortChange }) {
  const options = [
    { value: 'asc', label: 'Name (A-Z)' },
    { value: 'desc', label: 'Name (Z-A)' },
  ];

  const handleChange = (value) => {
    // Preserve existing API shape
    onSortChange?.({ target: { value } });
  };

  return (
    <Select.Root value={sortOrder} onValueChange={handleChange}>
      <Select.Trigger
        className="SelectTrigger"
        aria-label="Sort order"
      >
        <Select.Value />
        <Select.Icon className="SelectIcon">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="SelectContent" position="popper" sideOffset={6} align="center" collisionPadding={8}>
          <Select.Viewport className="SelectViewport">
            {options.map((opt) => (
              <Select.Item key={opt.value} value={opt.value} className="SelectItem">
                <Select.ItemIndicator className="SelectItemIndicator">
                  <CheckIcon />
                </Select.ItemIndicator>
                <Select.ItemText className="SelectItemText">{opt.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

export default SortDropDown
import React from 'react'
import * as Select from '@radix-ui/react-select'
import { ChevronDownIcon, CheckIcon } from '@radix-ui/react-icons'

function FilterCountry({ value = 'all', onselect }) {
  const continents = [
    { id: 0, value: 'all', label: 'All Regions' },
    { id: 1, value: 'africa', label: 'Africa' },
    { id: 2, value: 'asia', label: 'Asia' },
    { id: 3, value: 'europe', label: 'Europe' },
    { id: 4, value: 'north-america', label: 'North America' },
    { id: 5, value: 'south-america', label: 'South America' },
    { id: 6, value: 'oceania', label: 'Oceania' },
    { id: 7, value: 'antarctic', label: 'Antarctic' },
  ];

  const handleChange = (val) => onselect?.(val);
  const selected = continents.find(c => c.value === value) || continents[0];

  return (
    <Select.Root value={value} onValueChange={handleChange}>
      <Select.Trigger
        className="SelectTrigger"
        aria-label="Region"
      >
        <Select.Value>{selected.label}</Select.Value>
        <Select.Icon className="SelectIcon">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="SelectContent" position="popper" sideOffset={6} align="center" collisionPadding={8}>
          <Select.Viewport className="SelectViewport">
            {continents.map((c) => (
              <Select.Item key={c.id} value={c.value} className="SelectItem">
                <Select.ItemIndicator className="SelectItemIndicator">
                  <CheckIcon />
                </Select.ItemIndicator>
                <Select.ItemText className="SelectItemText">{c.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

export default FilterCountry
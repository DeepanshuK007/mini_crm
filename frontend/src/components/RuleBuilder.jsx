import React, { useState } from 'react';
import RuleCondition from './RuleCondition';

export default function RuleBuilder({ onSubmit }) {
  const [rules, setRules] = useState([{ field: 'totalSpend', operator: '>', value: '10000' }]);
  const [logicalOperator, setLogicalOperator] = useState('AND');

  const handleConditionChange = (index, updated) => {
    const newRules = [...rules];
    newRules[index] = updated;
    setRules(newRules);
  };

  const handleAdd = () => {
    setRules([...rules, { field: 'totalSpend', operator: '>', value: '' }]);
  };

  const handleRemove = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onSubmit({ rules, operator: logicalOperator });
  };

  return (
    <div className="border p-4 rounded w-full">
      <h3 className="text-lg font-bold mb-2">Define Audience Rules</h3>

      <div className="mb-3">
        Logical Operator: 
        <select
          value={logicalOperator}
          onChange={(e) => setLogicalOperator(e.target.value)}
          className="ml-2"
        >
          <option>AND</option>
          <option>OR</option>
        </select>
      </div>

      {rules.map((rule, i) => (
        <RuleCondition
          key={i}
          condition={rule}
          onChange={(updated) => handleConditionChange(i, updated)}
          onRemove={() => handleRemove(i)}
        />
      ))}

      <div className="flex gap-2 mt-3">
        <button onClick={handleAdd} className="bg-green-500 text-white px-2 py-1">Add Rule</button>
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-2 py-1">Preview Audience</button>
      </div>
    </div>
  );
}

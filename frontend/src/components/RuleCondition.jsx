import React from 'react';

const fields = ['totalSpend', 'visitCount', 'lastActive'];
const operators = ['>', '<', '==', '!='];

export default function RuleCondition({ condition, onChange, onRemove }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...condition, [name]: value });
  };

  return (
    <div className="flex gap-2 mb-2 items-center">
      <select name="field" value={condition.field} onChange={handleChange}>
        {fields.map((f) => <option key={f}>{f}</option>)}
      </select>
      <select name="operator" value={condition.operator} onChange={handleChange}>
        {operators.map((op) => <option key={op}>{op}</option>)}
      </select>
      <input
        name="value"
        value={condition.value}
        onChange={handleChange}
        placeholder="Value"
        className="border p-1"
      />
      <button onClick={onRemove} className="text-red-500">❌</button>
    </div>
  );
}

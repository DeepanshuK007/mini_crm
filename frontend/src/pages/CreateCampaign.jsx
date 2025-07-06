import React, { useState } from 'react';
import RuleBuilder from '../components/RuleBuilder';
import { previewAudience } from '../services/api';
import { createCampaign } from '../services/api';

export default function CreateCampaign() {
  const [audienceSize, setAudienceSize] = useState(null);
  const [message, setMessage] = useState('');
  const [campaignName, setCampaignName] = useState('');


  const handleCampaignSubmit = async (ruleSet) => {
    if (!message || !campaignName) {
      alert("Please enter a campaign name and message.");
      return;
    }

    const payload = {
      campaignName,
      rules: ruleSet.rules,
      operator: ruleSet.operator,
      message
    };

    const { data } = await createCampaign(payload);
    setAudienceSize(data.audienceSize);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Create Campaign</h2>

      <input
        className="border p-2 mb-2 w-full"
        placeholder="Campaign Name"
        value={campaignName}
        onChange={(e) => setCampaignName(e.target.value)}
      />

      <textarea
        className="border p-2 mb-4 w-full"
        placeholder="Campaign Message (e.g., Get 10% off on your next order!)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <RuleBuilder onSubmit={handleCampaignSubmit} />

      {audienceSize !== null && (
        <p className="mt-4 text-green-600 font-semibold">
          ✅ Campaign sent to {audienceSize} customers!
        </p>
      )}
    </div>
  );
}










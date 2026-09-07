type CreateAgentCardProps = {
  onClose: () => void;
};

export const CreateAgentCard = ({ onClose }: CreateAgentCardProps) => {
  return (
    <div className="">
      <button onClick={onClose}>Close</button>
      <h1>Create Agent</h1>
    </div>
  );
};

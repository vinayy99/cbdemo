
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { SkillSwap, SkillSwapStatus } from '../types';

const getStatusClasses = (status: SkillSwapStatus) => {
    switch (status) {
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        case 'accepted': return 'bg-green-100 text-green-800';
        case 'declined': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

const SkillSwapCard: React.FC<{ swap: SkillSwap; type: 'incoming' | 'outgoing' }> = ({ swap, type }) => {
    const { findUserById, updateSkillSwapStatus } = useAppContext();
    const otherUser = findUserById(type === 'incoming' ? swap.fromUserId : swap.toUserId);

    if (!otherUser) return null;

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center mb-3">
                        <img src={otherUser.avatar} alt={otherUser.name} className="w-10 h-10 rounded-full mr-3" />
                        <div>
                            <p className="font-semibold text-gray-800">{otherUser.name}</p>
                            <p className="text-sm text-gray-500">{type === 'incoming' ? 'Sent you a request' : 'You sent a request'}</p>
                        </div>
                    </div>
                    <p className="text-gray-600 mb-2"><strong>You get:</strong> <span className="text-primary font-medium">{swap.requestedSkill}</span></p>
                    <p className="text-gray-600"><strong>You give:</strong> <span className="text-secondary font-medium">{swap.offeredSkill}</span></p>
                    <p className="text-sm text-gray-500 mt-2 italic">"{swap.message}"</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusClasses(swap.status)}`}>
                    {swap.status}
                </span>
            </div>

            {type === 'incoming' && swap.status === 'pending' && (
                <div className="flex justify-end space-x-2 mt-4">
                    <button onClick={() => updateSkillSwapStatus(swap.id, 'accepted')} className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600">Accept</button>
                    <button onClick={() => updateSkillSwapStatus(swap.id, 'declined')} className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600">Decline</button>
                </div>
            )}
        </div>
    );
};


const SkillSwapPage: React.FC = () => {
    const { currentUser, skillSwaps } = useAppContext();

    if (!currentUser) return null;

    const incomingSwaps = skillSwaps.filter(s => s.toUserId === currentUser.id);
    const outgoingSwaps = skillSwaps.filter(s => s.fromUserId === currentUser.id);

    return (
        <div>
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-dark">Skill Swaps</h1>
                <p className="text-gray-600 mt-2">Exchange skills with other talented individuals in the community.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-bold text-dark mb-4">Incoming Requests</h2>
                    <div className="space-y-4">
                        {incomingSwaps.length > 0 ? (
                            incomingSwaps.map(swap => <SkillSwapCard key={swap.id} swap={swap} type="incoming" />)
                        ) : (
                            <p className="text-gray-500">No incoming skill swap requests.</p>
                        )}
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-dark mb-4">Outgoing Requests</h2>
                    <div className="space-y-4">
                        {outgoingSwaps.length > 0 ? (
                            outgoingSwaps.map(swap => <SkillSwapCard key={swap.id} swap={swap} type="outgoing" />)
                        ) : (
                            <p className="text-gray-500">You haven't sent any skill swap requests.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillSwapPage;

import React from 'react';
import { Link } from 'wouter';
import ProgressBar from './progress-bar';
import { Cause } from '@/lib/types';

interface DonateCardProps {
  cause: Cause;
}

const DonateCard: React.FC<DonateCardProps> = ({ cause }) => {
  const { id, title, description, image, raised, goal, progress } = cause;

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div 
        className="h-52 bg-cover bg-center" 
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="p-6">
        <h3 className="font-montserrat font-semibold text-xl mb-3">{title}</h3>
        <p className="text-gray-300 text-sm mb-4">{description}</p>
        <div className="mb-5">
          <ProgressBar progress={progress} colorClass="bg-secondary" />
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-400">Raised: ₹{raised.toLocaleString()}</span>
            <span>Goal: ₹{goal.toLocaleString()}</span>
          </div>
        </div>
        <Link 
          href={`/donate?cause=${id}`} 
          className="inline-block bg-secondary hover:bg-secondary/90 text-white px-4 py-3 rounded font-medium transition-colors w-full text-center"
        >
          Donate Now
        </Link>
      </div>
    </div>
  );
};

export default DonateCard;

import React from 'react';
import Image from 'next/image';
import teamData from '../../public/assets/teamData'; // Import your team data

const Team = () => {
  return (
    <div className="bg-black text-yellow-400 min-h-screen p-8">
      <h1 className="text-5xl text-center mb-12">THE TEAM</h1>
      <div className="grid grid-cols-3 gap-8">
        {teamData.map((member, index) => (
          <div key={index} className="text-center">
            <h2 className="text-2xl font-bold">{member.name}</h2>
            <p className="text-lg">{member.role}</p>
            <div className="my-4">
              <Image
                src={member.image}
                alt={member.name}
                width={200}
                height={200}
                className="mx-auto rounded-full"
              />
            </div>
            <p className="text-sm">{member.skills}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;

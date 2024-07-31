import React from 'react';
import Image from 'next/image';
import teamData from '../../public/assets/teamdata'; // Import your team data


const Team = () => {
  return (
    <div className="bg-black text-yellow-400 min-h-screen p-8">
      <h1 className="text-5xl text-center mb-12">THE TEAM</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
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

{/* Tech Stack Card */}
<div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Our Tech Stack</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full">
              <svg fill="currentColor" strokeWidth="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="2em" width="2em">
                <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"></path>
              </svg>
            </div>
            <div className="text-lg font-semibold">Next.js</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full">
              <svg fill="currentColor" strokeWidth="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="2em" width="2em">
                <path d="M314 36.38c-18.59-3.06-45.8-4.47-64.27-4.38a311.09 311.09 0 0 0-51.66 4.38c-45.74 8-54.07 24.7-54.07 55.54V128h112v16H107.62C66.06 144 32.33 193.67 32 255.12v.88a162.91 162.91 0 0 0 3.13 32c9.29 46.28 38.23 80 72.49 80H128v-54c0-31.3 20.84-59.95 55-66.1l9.87-1.23H314a56.05 56.05 0 0 0 15.06-2A52.48 52.48 0 0 0 368 193.68V91.92c0-28.92-24.68-50.73-54-55.54ZM194.93 105.5a20.37 20.37 0 1 1 20.3-20.3 20.29 20.29 0 0 1-20.3 20.3Z"></path>
                <path d="M475.28 217c-10.7-42.61-38.41-73-70.9-73h-17.71v47.45c0 39.57-26 68.22-57.74 73.13a63.54 63.54 0 0 1-9.69.75H198.08a60 60 0 0 0-15.23 1.95C160.54 273.14 144 291.7 144 315.77v101.77c0 29 29.14 46 57.73 54.31 34.21 9.95 71.48 11.75 112.42 0 27.19-7.77 53.85-23.48 53.85-54.31V384H256v-16h148.38c29.44 0 54.95-24.93 67.45-61.31A156.83 156.83 0 0 0 480 256a160.64 160.64 0 0 0-4.72-39ZM316.51 404a20.37 20.37 0 1 1-20.3 20.3 20.29 20.29 0 0 1 20.3-20.3Z"></path>
              </svg>
            </div>
            <div className="text-lg font-semibold">Python</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full">
            <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="2em" width="2em" ><path d="M4.409 6.608 7.981.255l3.572 6.353H4.409zM8.411 0l3.569 6.348L15.552 0H8.411zm4.036 17.392 3.572 6.354 3.575-6.354h-7.147zm-.608-10.284h-7.43l3.715 6.605 3.715-6.605zm.428-.25h7.428L15.982.255l-3.715 6.603zM15.589 24l-3.569-6.349L8.448 24h7.141zm-3.856-6.858H4.306l3.712 6.603 3.715-6.603zm.428-.25h7.433l-3.718-6.605-3.715 6.605z"></path></svg>            
            </div>
            <div className="text-lg font-semibold">Solidity</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full">
            <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="2em" width="2em"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"></path></svg>            </div>
            <div className="text-lg font-semibold">TypeScript</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full">
            <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="2em" width="2em"><path d="M12 0C5.375 0 0 5.375 0 12c0 6.627 5.375 12 12 12 6.626 0 12-5.373 12-12 0-6.625-5.373-12-12-12zm-.624 21.62v-7.528H7.19L13.203 2.38v7.528h4.029L11.376 21.62z"></path></svg>
            </div>
            <div className="text-lg font-semibold">FastAPI</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full">
            <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="2em" width="2em"><path fill-rule="evenodd" d="m256 48 240 416H16Z"></path></svg>
            </div>
            <div className="text-lg font-semibold">Vercel</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;

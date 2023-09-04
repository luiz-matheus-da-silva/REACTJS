const Page = () => {

    const realTime = Intl.DateTimeFormat('pt-BR', {
        timeStyle: 'short',
        hour12: false
    }).format();

    const hour = 15;

    return (

     <div className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-screen w-screen flex justify-center items-center flex-col">
        <div className="text-9xl">{realTime}</div>
        <div className="text-5xl font-bold">
            {hour >= 0 && hour <= 12 && "Bom Dia 😊"}
            {hour >= 13 && hour <= 18 && "Boa Tarde 😁"}
            {hour >= 19 && hour <= 23 && "Boa Noite 😴"}

        </div>
     </div>
     
    );
};

export default Page;

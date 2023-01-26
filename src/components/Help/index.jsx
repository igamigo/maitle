function Box(props) {
  let state = "text-black border-2 border-gray-300 dark:text-white";
  if (props.state === "C") state = "bg-emerald-500 text-white";
  if (props.state === "E") state = "bg-amber-500 text-white";
  if (props.state === "N") state = "bg-zinc-500 text-white dark:bg-gray-700";

  return (
    <div
      className={
        "w-8 h-8 sm:w-10 sm:h-10 grid place-items-center p-0 m-0 font-bold text-lg sm:text-2xl " + state
      }
    >
      {props.value}
    </div>
  );
}

function Help() {
  return (
    <>
      <p className="text-left text-sm sm:text-base py-5 font-regular opacity-75 mr-1">
        Kjjjj si ya sabés cómo jugar
        <br />
        
      </p>

      <p className="text-left text-sm sm:text-base py-2 opacity-75">
        Feliz cumple Maichu <p>&lt;3</p>
      </p>
      <hr />
      <div className="flex gap-1">
        <Box value="H" state="C" />
        <Box value="O" />
        <Box value="L" />
        <Box value="A" />
        <Box value="A" />
      </div>
      <div className="flex gap-1">
        <Box value="M" />
        <Box value="A" />
        <Box value="I" state="E" />
        <Box value="T" />
        <Box value="E" />
      </div>
      <p className="text-left text-sm sm:text-base py-2 opacity-75">
      </p>
      <div className="flex gap-1">
        <Box value="❤️" />
        <Box value="C" state="N" />
        <Box value="A" />
        <Box value="R" />
        <Box value="P" />
      </div>
      <p className="text-left text-sm sm:text-base py-2 opacity-75">
      </p>
    </>
  );
}

export default Help;

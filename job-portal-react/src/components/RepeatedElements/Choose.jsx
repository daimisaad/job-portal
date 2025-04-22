function Choose({ type = "", isChoosed = false,change=null, children }) {
    const handleChange = isChoosed ? null : () => change(c=> !c)
  return (
    <div
    onClick={handleChange}
      className={
        "flex items-center gap-4 border-1 border-b-3 border-amber-700 lg:w-full md:w-full h-fit  p-4 cursor-pointer select-none transition-all  " +
        (isChoosed
          ? "border-b-primary text-primary"
          : "border-b-gray-900")
      }
    >
      {children}
      <div className="grid w-fit">
        <h1 className="text-xl font-bold">{type}</h1>
        <h3 className="w-fit">Créer un compte en tant que {type}</h3>
      </div>
    </div>
  );
  }

  export default Choose;
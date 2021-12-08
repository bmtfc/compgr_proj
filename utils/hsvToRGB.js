const hsvToHSL = (hsvH, hsvS, hsvV) => {
  const hslL = (200 - hsvS) * hsvV / 100;
	const [ hslS, hslV ] = [
		hslL === 0 || hslL === 200 ? 0 : hsvS * hsvV / 100 / (hslL <= 100 ? hslL : 200 - hslL) * 100,
		hslL * 5 / 10
	];
	return [ hsvH, hslS, hslV ];
}

export { hsvToHSL }
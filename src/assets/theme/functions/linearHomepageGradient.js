import { PropTypes as p } from 'prop-types';

function linearHomepageGradient(colorPercentages, angle = 0) {
  console.log(colorPercentages);
  const a = colorPercentages.map(
    ({ color, percentage }, i) => ` ${color} ${percentage}%`
  ); //
  console.log(a.join(','));
  const res = `linear-gradient(${angle}deg, ${a})`;
  console.log(res);
  return res;
}


function linearHomepageGradient(colorPercentages, angle = 0){
  console.log(colorPercentages)
  const a = colorPercentages.map(({color, percentage}, i) => ` ${color} ${percentage}%`) //
  console.log(a.join(","))
  const res =  `linear-gradient(${angle}deg, ${a})`
  console.log(res)
  return res;
}

linearHomepageGradient.propTypes = {
<<<<<<< HEAD
  colorPercentages: p.arrayOf(
    p.shape({
      color: p.string.isRequired,
      percent: p.number.isRequired,
    }).isRequired
  ).isRequired,
  angle: p.number,
};

export default linearHomepageGradient;
=======
    colorPercentages: p.arrayOf(p.shape({
      color: p.string.isRequired,  
      percent: p.number.isRequired
    }).isRequired).isRequired,
    angle: p.number
};

export default linearHomepageGradient;
>>>>>>> 99cbaf222b9f75dfcfe224aa392370ed478207d1

import { PropTypes as p } from 'prop-types';

function linearHomepageGradient(colorPercentages, angle = 0) {
  //console.log(colorPercentages);
  const a = colorPercentages.map(
    ({ color, percentage }, i) => ` ${color} ${percentage}%`
  ); //
  //console.log(a.join(','));
  const res = `linear-gradient(${angle}deg, ${a})`;
  //console.log(res);
  return res;
}

linearHomepageGradient.propTypes = {
  colorPercentages: p.arrayOf(
    p.shape({
      color: p.string.isRequired,
      percent: p.number.isRequired,
    }).isRequired
  ).isRequired,
  angle: p.number,
};

export default linearHomepageGradient;

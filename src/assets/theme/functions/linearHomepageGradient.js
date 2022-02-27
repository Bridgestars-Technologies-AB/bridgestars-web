
import {PropTypes as p} from "prop-types";




linearHomepageGradient.propTypes = {
    colorPercentages: p.arrayOf(p.object).isRequired,
    angle: p.number
};


function linearHomepageGradient({colorPercentages, angle}){
  const a = colorPercentages.map(({color, percent}) => `${color} ${percent}%`)
  return `linear-gradient(${angle}deg, ${a})`
}

export default linearHomepageGradient;
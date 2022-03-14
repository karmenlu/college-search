import React from 'react';
import '../App.css';
import {FaInfoCircle} from 'react-icons/fa';

const fields = {'UNITID': 'Unit ID', 'INSTNM': 'Institution Name', 'CITY': 'City', 'STABBR': 'State Postal Code', 
                'ZIP': 'ZIP Code', 'INSTURL': 'URL', 'HIGHDEG': 'Highest Degree Awarded', 'LOCALE': 'Locale', 'LATITUDE': 'Latitude',
                'LONGITUDE': 'Longitude', 'CCSIZSET': 'Carnegie Classification', 'ADM_RATE': 'Admission Rate', 'SAT_AVG': 'Average SAT',
                'PROGRAMS': 'Available Programs'}

class CollegeCard extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        const school = this.props.school;

        return (
            <div key={JSON.stringify(school)} className='college-card'>
                <div className='grid'>
                    <div className='name'>{school['INSTNM']}</div>
                    <a className='info' href={'//' + school['INSTURL']} target="_blank">
                        <FaInfoCircle/>
                    </a>
                    <div className='city'>{school['CITY']}</div>
                    <div className='distance'>Distance : {school['DIST']}</div>
                    <div className='admission'>{fields['ADM_RATE']}: {school['ADM_RATE']}</div>
                    <div className='sat'>{fields['SAT_AVG']}: {school['SAT_AVG']}</div>
                    <div className='carnegie'>{fields['CCSIZSET']}: {school['CCSIZSET']}</div>
                </div>
                <div>{fields['PROGRAMS']}:</div>
                <div className='programs'>
                    {school['PROGRAMS'].map((program, index) => (
                        <div key={index} className='program'>{program}</div>
                    ))}
                </div>
            </div>
        )
    }
}

export default CollegeCard;
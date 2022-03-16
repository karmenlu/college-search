import React from 'react';
import '../App.css';
import CollegeCard from '../components/CollegeCard';
import { createSorter } from '../utils/Sort';
import Axios from 'axios';

const API_URL = 'http://localhost:3001';

class Colleges extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            lon: -71.09667,
            lat: 42.34212,
        };

    };

    static defaultProps = {
        sorters: [{
            property: 'ADM_RATE'
        }, {
            property: 'SAT_AVG'
        }, {
            property: 'INSTNM'
        }]
    }

    componentDidMount() {
        const schoolsRequest = async () => {
            try {
                const schoolsResponse = await Axios.get(API_URL + '/schools');
                this.setState({data: schoolsResponse.data})
            } catch (err) {
                console.log(err);
            }
        }
        schoolsRequest();
    }

    sortData(sortType) {
        const sorters = [];
        let [sortProperty, sortDirection] = sortType.split(':');
        sorters.push({property: sortProperty, direction: sortDirection});
        const filteredData =  this.computeNewDistances(this.state.data).filter((school) => school[sortProperty] != 'NULL'); 

        if (filteredData && filteredData.length) {
            const sorted = [...filteredData].sort(createSorter(...sorters))

            this.setState({data: sorted});
        }
    }

    distance(otherLat, otherLon) {
		var radlat1 = Math.PI * otherLat/180;
		var radlat2 = Math.PI * this.state.lat/180;
		var theta = otherLon-this.state.lon;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
        return dist;
    } 

    computeNewDistances(data) {
        const newData = [...data];

        newData.map((school) => {
            school['DIST'] = this.distance(school['LATITUDE'], school['LONGITUDE']);
        })
        return newData;
    }

    updateDistances() {
        const newData = this.computeNewDistances(this.state.data)
        this.setState({data: newData});
    }

    renderSchools() {
        const data = this.computeNewDistances(this.state.data);
        if (data.length > 0){
            return (
                <div className='school-list'>
                    {data.map((school,index) => (
                        <CollegeCard key={school['CITY'] + school['INSTNM'] + school['LOCALE'] + index}
                                     id={index}
                                     school={school}/>
                    ))}
                </div>
            )
        } else {
            return <div className='none-msg'>No items found.</div>
        }
    }

    renderLoading() {
        return <div className='load-msg'>Loading...</div>
    }

    render() {
        const {data} = this.state;
        return (
            <div className='page colleges'>
            <div className='toolbar'>
                <div className='lat-provider'>
                    <input type='text' default='42.34212' placeholder='Latitude' 
                        onChange={(e)=> {this.setState({lon: e.target.value});}}/>
                </div>
                <div className='lon-provider'>
                    <input type='text' default='-71.09667' placeholder='Longitude' 
                        onChange={(e)=> {this.setState({lat: e.target.value});}}/>
                </div>
                <div>
                    <button onClick={this.updateDistances}>Update Location</button>
                </div>
                <div className='sort-dropdown'>
                    <select onChange={(e) => {this.sortData(e.target.value)}}>
                        <option value='DIST:ASC'>Distance (Low-High)</option>
                        <option value='DIST:DSC'>Distance (High-Low)</option>
                        <option value='ADM_RATE:ASC'>Admission Rate (Low-High)</option>
                        <option value='ADM_RATE:DSC'>Admission Rate (High-Low)</option>
                        <option value='SAT_AVG:ASC'>SAT Score (Low-High)</option>
                        <option value='SAT_AVG:DSC'>SAT Score (High-Low)</option>
                        <option value='INSTNM:ASC'>A-Z</option>
                        <option value='INSTNM:DSC'>Z-A</option>
                    </select>
                </div>
            </div>
            {data ? this.renderSchools() : this.renderLoading()}
            </div>
        )
    }
}

export default Colleges;
import React from 'react';
import arrowRight from '../img/arrow-right.png';
import arrowLeft from '../img/arrow-left.png';
import axios from 'axios'
import '../App.css'
import Preview from './preview'
class Videos extends React.Component {
    constructor() {
        super();
        this.state = {
            currentImageIndex: 0,
            images: [],
            arrowNext: arrowRight,
            arrowPrev: arrowLeft,
            isOpen: false
        };
        this.nextSlide = this.nextSlide.bind(this);
        this.prevSlide = this.prevSlide.bind(this);
        this.filterData = this.filterData.bind(this)
        this.showPreviewDialog = this.showPreviewDialog.bind(this)
    }
    componentDidMount() {
        axios.get(`https://api.github.com/users`)
            .then(res => {
                this.filterData(res.data)
            })
    }
    handleShowDialog = () => {
        this.setState({ isOpen: !this.state.isOpen });
        console.log("cliked");
    };
    showPreviewDialog() {
        this.setState({
            isOpen: true,
        });
    };

    filterData(response) {
        const data = response.filter(item => item.site_admin === false).map(item => {
            return {
                login: item.login,
                avatar_url: item.avatar_url,
                type: item.type
            }
        })
        this.setState({
            images: data
        })
    }
    prevSlide() {
        const lastIndex = this.state.images.length - 1;
        const resetIndex = this.state.currentImageIndex === 0;
        const index = resetIndex ? lastIndex : this.state.currentImageIndex - 1;
        this.setState({
            currentImageIndex: index
        })
    }
    nextSlide() {
        const lastIndex = this.state.images.length - 1;
        const resetIndex = this.state.currentImageIndex === lastIndex;
        const index = resetIndex ? 0 : this.state.currentImageIndex + 1;
        this.setState({
            currentImageIndex: index
        });
    }
    render() {
        const index = this.state.currentImageIndex;
        let firstFiveVideo = this.state.images.slice(index, index + 3);
        if (firstFiveVideo.length < 3) {
            firstFiveVideo = firstFiveVideo.concat(this.state.images.slice(0, 3 - firstFiveVideo.length))
        }
        return (
            <div className="detail-panel">
                <img className="move-button" src={this.state.arrowPrev} onClick={this.prevSlide} />
                {firstFiveVideo.map((image, index) =>
                    <div className="main-content">
                        <img onClick={(key) => { this.showPreviewDialog(key) }} key={index} src={image.avatar_url} alt="" />
                        {this.state.isOpen ?
                            <Preview data={image} /> :
                            null
                        }
                        <li>Login: {image.login}</li>
                        <li>Login: {image.type}</li>
                    </div >
                )
                }
                <img className="move-button" src={this.state.arrowNext} onClick={this.nextSlide} />
            </div >
        );
    }
}

export default Videos
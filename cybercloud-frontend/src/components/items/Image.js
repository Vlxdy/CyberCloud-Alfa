import React, { Component } from 'react'
import axios from 'axios'
export default class image extends Component {
    state = {
        detail: '',
        selectedFile: null,
        images:[]
    }
    getImages = async () => {
        const res = await axios.get('http://localhost:4000/api/image')
        this.setState({
            images: res.data
        });
        console.log(res)
    }
    async componentDidMount() {
        this.getImages();
    }
    onChangeDetail = e => {
        this.setState({
            detail: e.target.value
        })
    }
    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }
    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        axios.post('http://localhost:4000/api/upload', fd, {
            onUploadProgress: ProgressEvent => {
                console.log('Upload Progress: ' + (ProgressEvent.loaded / ProgressEvent.total) * 100)
            }
        })
            .then(res => {
                console.log(res)
                axios.post('http://localhost:4000/api/image', {
                    name: this.state.selectedFile.name,
                    detail: this.state.detail
                })
                    .then(res => {
                        console.log(res);
                        this.setState({
                            detail: '',
                            selectedFile: null
                        })
                        this.getImages();
                    });
            });
            
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-5">
                <div className="card card-body">
                    <form onSubmit={this.fileUploadHandler}>
                    <h1>Subir ícono</h1>
                    <label>Detalle: </label>
                    <div className="form-group">
                        <input
                        type="text"
                        className="form-control"
                        value={this.state.detail}
                        onChange={this.onChangeDetail}
                        maxLength="20"
                        required
                        />
                    </div>
                    <div className="form-group">
                    <input type="file" className="" onChange={this.fileSelectedHandler} required/>
                    </div>

                    <button type="submit" className="btn btn-secondary">Subir</button>
                    </form>
                
                </div>
                </div>
                <div className="col-md-7">
                    <div className="row">
                    {
                        this.state.images.map(image => (
                            <div className="card m-2 col-2 p-2  text-cent align-items-center bg-dark text-white" key={image._id}>
                                <img src={"http://localhost:4000/images/" + image.name} className="rounded float-left" height="70" width="70" alt="http://localhost:4000/images/item.png" />
                                {image.detail}

                            </div>)
                        )
                    }
                    </div>
                
                </div>
            </div>
            
        )
    }
}

import React, { Component } from 'react'
import axios from 'axios'
export default class image extends Component {
    state = {
        detail: '',
        selectedFile: null,
        images: []
    }
    getImages = async () => {
        try {
            const res = await axios.get('http://'+global.ip+':4000/api/image')
            this.setState({
            images: res.data
            });
        } catch (error) {
            console.log(error)
        }
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
    handleSubmit = () => {
        if (this.state.detail==="") {
            window.alert('Llene los campos necesarios.');
        }
        else{
        try {
            const fd = new FormData();
            fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
            axios.post('http://'+global.ip+':4000/api/upload', fd, {
                onUploadProgress: ProgressEvent => {
                    console.log('Upload Progress: ' + (ProgressEvent.loaded / ProgressEvent.total) * 100)
                }
            })
                .then(res => {
                    console.log(res)
                    axios.post('http://'+global.ip+':4000/api/image', {
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
        } catch (error) {
            console.log(error)
            window.alert('Llene los campos necesarios.');
        }
    }
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-5">
                    <h1>Subir ícono</h1>
                    <div className="card card-body">
                        
                            <div className="form-group">
                                <label>Detail:</label>
                                <input
                                    className="form-control"
                                    value={this.state.detail}
                                    type="text"
                                    onChange={this.onChangeDetail}
                                    placeholder="Escribe algo"
                                    maxLength="20"
                                    required
                                />
                            </div>
                            <div className="form-group">
                            <input type="file" onChange={this.fileSelectedHandler} required />
                            </div>
                            
                            <div className="form-group">
                            <input type="submit" value="Guardar" className="btn btn-info" onClick={this.handleSubmit} />
                            </div>
                        

                    </div>
                </div>
                <div className="col-md-7">
                    <div className="row">
                        {
                            this.state.images.map(image => (
                                <div className="card m-2 col-2 p-2  text-cent align-items-center bg-light" key={image._id}>
                                    <img src={"http://"+global.ip+":4000/images/" + image.name} className="rounded float-left" height="70" width="70" alt="error" onError={(e)=>{e.target.src="http://"+global.ip+":4000/images/item.png"}}/>
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

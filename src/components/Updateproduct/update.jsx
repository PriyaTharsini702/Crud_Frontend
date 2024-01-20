import { useState,useEffect } from "react";
import axios from "axios";
import { Link, useNavigate ,Navigate,useParams} from "react-router-dom";
import styles from './styles.module.css'

const Update = () => {
	const [value, setValues] = useState({
		id: '',
		name: '',
		price: '',
		description: '',
	});
	const [logout, setlogout] = useState(false);
    const {_id} = useParams();
    const navigate = useNavigate()


    useEffect (() => {
    axios.get(`https://crudcrud.com/api/c901b5bf0c1a46ef9d3c41990052223a/productlists/${_id}`)
    .then(res => setValues(res.data))
    .catch(err => console.log(err));
    }, [_id])

    const handleChange = ({ currentTarget: input }) => {
		setValues({ ...value, [input.name]: input.value });
	};

    

    const handleSubmit = async (e) => {
        debugger
		e.preventDefault();
         const {id,name,price,description} = value
         console.log(name,'helllllo')
        axios.put(`https://crudcrud.com/api/c901b5bf0c1a46ef9d3c41990052223a/productlists/${_id}`,{id,name,price,description})
			.then(res => {
				console.log(res)
                navigate('/home')

			})
			.catch((err) => console.error(err))
		
	};

	return (
        <div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1 className={styles.shoppyfy}>Shoppyfy</h1>
			</nav>
            <div className={styles.updateproduct_container}>
			<div className={styles.updateproduct_form_container}>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h2>Update Product</h2>
						<input
							type="number"
							placeholder="Product Id"
							name="id"
							value={value.id}
							required
							className={styles.input}
                            onChange={handleChange}
						/>
						<input
							type="text"
							placeholder="Product Name"
							name="name"
							value={value.name}
							required
							className={styles.input}
                            onChange={handleChange}
						/>

                            <input
							type="number"
							placeholder="Product Price"
							name="price"
							value={value.price}
							required
							className={styles.input}
                            onChange={handleChange}
						    />

                        <input
							type="text"
							placeholder="Product Description"
							name="description"
							value={value.description}
							required
							className={styles.input}
                            onChange={handleChange}
						    />
					<div className={styles.flexbtn}>

                    <button type="submit"  className={styles.create_btn} >
							Update
						</button>
                        <Link to='/home' className={styles.back_btn}>Back</Link>
						
                    </div>
						
					</form>
				</div>
			</div>
		</div> 

        </div>
		
		
	);
}

export default Update;

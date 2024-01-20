import { useState,useEffect } from "react";
import axios from "axios";
import { Link, useNavigate ,Navigate} from "react-router-dom";
import styles from './styles.module.css'


const Addproduct = () => {
	const [data, setData] = useState({
		id: "",
		name: "",
		price: "",
		description: "",
	});

    const navigate = useNavigate()
	
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};



	const handleSubmit = async (e) => {
		e.preventDefault();
        console.log(data)
        axios.post('https://crudcrud.com/api/7f58ea53539f49f0850183944fec9b45/productlists', data)
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
            <div className={styles.addproduct_container}>
			<div className={styles.addproduct_form_container}>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h2>Add Product</h2>
						<input
							type="number"
							placeholder="Product Id"
							name="id"
							onChange={handleChange}
							value={data.id}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Product Name"
							name="name"
							onChange={handleChange}
							value={data.name}
							required
							className={styles.input}
						/>

                            <input
							type="text"
							placeholder="Product Price"
							name="price"
							onChange={handleChange}
							value={data.price}
							required
							className={styles.input}
						    />

                        <input
							type="text"
							placeholder="Product Description"
							name="description"
							onChange={handleChange}
							value={data.description}
							required
							className={styles.input}
						    />
					<div className={styles.flexbtn}>

                    <button type="submit" className={styles.create_btn}>
							Create
						</button>

                      
                        <Link to='/home' className={styles.back_btn}>Back</Link>
						
                    </div>
						
					</form>
				</div>
			</div>
		</div> 

        </div>
		
		
	);
};

export default Addproduct;

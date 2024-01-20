import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import axios from 'axios'

const Main = () => {
	const history = useNavigate()
	const [logout, setlogout] = useState(false);
	const [data, setdata] = useState([])

	useEffect(() => {

		if (!localStorage.getItem('token'))
			history.location = "/login";

		axios.get('https://crudcrud.com/api/c901b5bf0c1a46ef9d3c41990052223a/productlists')
			.then(res => {
				setdata(res.data);
				console.log(res.data)
			})
			.catch((err) => console.error(err))

	}, [logout])

	const handleLogout = (e) => {
		e.preventDefault();
		localStorage.removeItem("token");
		window.location.reload();
		setlogout(true)

	};

	 const handleDelete = (id)=>{
		const confirm = window.confirm("Are you sure, want to delete?")

		if(confirm){
			axios.delete(`https://crudcrud.com/api/c901b5bf0c1a46ef9d3c41990052223a/productlists/${id}`)
			.then(res=> {
				history.location="/home";
				 window.location.reload();})
			.catch(err=>console.log(err))
		}
	 }

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1 >Shoppyfy</h1>
				<button className={styles.white_btn} onClick={(e) => handleLogout(e)}>
					Logout
				</button>
			</nav>
			<div className={styles.imageflex}>
				<div className={styles.bgimage} />
				<div className={styles.bgimage1} />
				<div className={styles.bgimage2} />
			</div>
			<br /><br />
			<p className={styles.heading}>LIST OF PRODUCTS</p>
			<br /><br />

			<div style={{width: '90%', textAlign:'right'}}>
			<button className={styles.add}><Link to='/addproduct' style={{textDecoration:'none'}}>Add Product +</Link></button>
			</div>
			<br/>
			<div className={styles.tablemain}>
				<table className={styles.tablestyle}>
					<thead>
						<tr>
							<th>Id</th>
							<th>Product Name</th>
							<th>Price</th>
							<th>Description</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{Array.isArray(Object.values(data)) ? (
							Object.values(data).map((item) => (
								<tr>
									<td>{item.id}</td>
									<td>{item.name}</td>
									<td>{item.price}</td>
									<td>{item.description}</td>
									<td>
										<button className={styles.edit}> <Link to={`/update/${item._id}`} style={{textDecoration:'none'}}>Edit</Link></button>
										<button onClick={(e)=>{handleDelete(item._id)}} className={styles.delete}>Delete</button></td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="5">No data available</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

		</div>
	);
};

export default Main;

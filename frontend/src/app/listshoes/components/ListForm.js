
export default function ListForm() {
    
    const submtForm = () => {
        console.log('submit form ran')
    }
     
      return (
       <form onSubmit={console.log('submit form ran')}>
        <button type="submit" styles="hidden text-white bg-primaryColor  md:flex">List Shoe</button>
       </form>
      )
}
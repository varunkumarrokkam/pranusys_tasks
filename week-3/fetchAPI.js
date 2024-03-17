const apiUrl = "https://reqres.in/api/users?page=1";

 fetchData  = async () => {
   try {
        const response = await fetch(apiUrl);

        if (!response.ok){
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        console.log(data);
   }
    catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

fetchData();
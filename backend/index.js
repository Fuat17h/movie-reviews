import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"
import MoviesDAO from './dao/moviesDAO.js'
import ReviewsDAO from './dao/reviewsDAO.js'

async function main(){
    
    dotenv.config() // to load environment variables

    const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true }
        )
    const port  = process.env.PORT || 8000

    try {

        // Connect to the MongoDB cluster
        await client.connect() // returns promise


        // Initializing MoviesDAO and ReviewsDAO

        await MoviesDAO.injectDB(client)
        await ReviewsDAO.injectDB(client)

        // if connected and no error
        app.listen(port, () => {
            console.log('server is running on port: ' + port);
        })

    } catch (e) {
        console.log(e);
        process.exit(1)
    }


    

}

main().catch(console.error);
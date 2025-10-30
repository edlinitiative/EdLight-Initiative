// YouTube Playlist Fetcher
// You'll need to get an API key from Google Cloud Console

const API_KEY = 'YOUR_YOUTUBE_API_KEY'; // Replace with your actual API key
const CHANNEL_ID = 'YOUR_CHANNEL_ID'; // Replace with EdLight Initiative's channel ID

async function fetchPlaylists() {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${CHANNEL_ID}&maxResults=50&key=${API_KEY}`
        );
        
        const data = await response.json();
        
        console.log('EdLight Initiative Playlists:');
        console.log('============================');
        
        data.items.forEach((playlist, index) => {
            console.log(`${index + 1}. Title: ${playlist.snippet.title}`);
            console.log(`   ID: ${playlist.id}`);
            console.log(`   Description: ${playlist.snippet.description.substring(0, 100)}...`);
            console.log('---');
        });
        
        // Generate the courses array format
        console.log('\nCourses Array Format:');
        console.log('====================');
        
        data.items.forEach((playlist, index) => {
            const courseId = index + 1;
            const title = playlist.snippet.title;
            const playlistId = playlist.id;
            
            console.log(`{
    id: ${courseId},
    title: "${title}",
    description: "Course description here...",
    instructor: "Instructor Name",
    duration: "X weeks",
    students: 0,
    rating: 4.5,
    level: "Level",
    subjects: ["Subject1", "Subject2"],
    playlistId: "${playlistId}",
    price: "Free"
},`);
        });
        
    } catch (error) {
        console.error('Error fetching playlists:', error);
    }
}

// Run the function
// fetchPlaylists();

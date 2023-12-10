import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import { useRouter } from 'next/router';
import GlobalContext from "../../pages/store/globalContext"
import { useContext } from 'react'
import CreatePostModal from '@/Components/CreatePostModal/CreatePostModal';

function NewMeetupPage() {
    const router = useRouter()
    const globalCtx = useContext(GlobalContext)

    async function addPostHandler(enteredPostData)  {
        await globalCtx.updateGlobals({cmd: 'addPost', newVal: enteredPostData})
        router.push('/');
    }

    return <CreatePostModal onAddPost={addPostHandler} />
}

export default NewMeetupPage
import {useContext, useEffect, useState} from "react";
import {useInRouterContext, useNavigate} from "react-router-dom";
import {getQuestions, Question} from "../api/questions";
import {ToasterContext} from "../contexts/toast";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Button} from "primereact/button";
import {profile} from "../api/auth";
import {AuthContext} from "../contexts/auth";
  
export default function () {
  console.log('questions')
  const toast = useContext(ToasterContext)
  const user = useContext(AuthContext)
  const [questions, setQuestions] = useState<Question[]>([]);
  const navigate = useNavigate()
  const handleCheck = async() => {
    try {
      const r = await profile()
      console.log(r)
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
     (async() => {
      try {
        const response = await getQuestions()
        const _questions = response.data
        const questions = Object.entries(_questions).map(([k,v]) => ({...v, id: k}))
        setQuestions(questions)
      } catch (e: unknown) {
        toast.current?.show({
          summary: 'Unable to fetch questions',
          severity: 'error',
        })
      }
    })()
  }, [])
  return (
    <>
      {user?.authState.isAdmin
        &&
        <div className="flex flex-row-reverse m-2">
          <Button onClick={() => navigate('/questions/create')}>Create Question</Button>
        </div>
      }
      <DataTable value={questions} tableStyle={{ minWidth: '50rem' }} paginator rows={10} selectionMode="single" onSelectionChange={(e) => {navigate(`/questions/${(e.value as any).id}`)}}>
        <Column field="title" header="Title"></Column>
        <Column field="description" header="Description"></Column>
        <Column field="acceptance" header="Acceptance"></Column>
        <Column field="difficulty" header="Difficulty"></Column>
      </DataTable>
    </>
  )
}

import { useEffect, useState } from "react"
import { getSchedulingById, getSchedulings, getUserSchedulings, updateScheduling } from "../../../service/operational"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store"
import CommonTable from "../../../Components/CommonTable/CommonTable"
import { SchedulingType } from "../../../utils/types/types"
import { formatarMoedaReal, formatDate, statusValue } from "../../../utils/functions"
import ModalEditScheduling from "../../../Components/Modals/ModalEditScheduling/ModalEditScheduling"
import { useLocation } from "react-router-dom"
import ModalSeeDetails from "../../../Components/Modals/ModalSeeDetails/ModalSeeDetails"
import StatusExhibition from "../../../Components/StatusExhibition/StatusExhibition"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CommonSnackBar from "../../../Components/CommonSnackBar/CommonSnackBar"
import { setScheduling } from "../../../store/reducers/scheduling/scheduling"

const YourSchedulings = () => {
    const user = useSelector((state: RootState) => state.user.user)
    const schedulings = useSelector((state: RootState) => state.scheduling.schedulings)
    const [openedEdit, setOpenedModalEdit] = useState(false)
    const [openedSeeDetails, setOpenedSeeDetails] = useState(false)
    const [onlyView, setOnlyView] = useState(false)
    const [tableRowMold, setTableRowMold] = useState<any>([])
    const [schedulingToEdit, setSchedulingToEdit] = useState<string>('')
    const tableHeaders = [
        { ref: 'service_name', name: "Serviço" },
        { ref: 'hourly', name: "Horário" },
        { ref: 'day_month', name: "Dia/Mês" },
        { ref: 'value', name: "Valor" },
        { ref: 'status', name: "Status" }
    ]
    const [messageSnackBar, setMessageSnackBar] = useState<{
        message: string;
        type: "error" | "info" | "success" | "warning";
    } | null>(null)
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        handleGetSchedulingsByUser()
    }, [location.key])

    async function handleGetSchedulingsByUser() {
        let response = user?.owner ? await getSchedulings() : await getUserSchedulings(user?.id)
        console.log(response)
        response = response.reverse()
        shapeRow(response)
        dispatch(setScheduling(response))
    }

    function shapeRow(schedulings: Array<SchedulingType>) {
        if (schedulings.length <= 0) return
        let rowsMold: any = []
        schedulings.forEach(item => {
            let row = {
                id: item.id,
                service_name: item.service.name,
                hourly: formatDate(item.hour, item.minute, ':'),
                day_month: formatDate(item.day, item.month + 1, '/'),
                value: formatarMoedaReal(item.service.value),
                status: <StatusExhibition status={item.status} />,
                status_number: item.status
            }
            rowsMold.push(row)
        });
        console.log(rowsMold)
        setTableRowMold(rowsMold)

    }

    async function handleChangeSchedulingStatus(status: number, id: string) {
        let scheduling = await getSchedulingById(id)
        scheduling.status = status
        let response = await updateScheduling(scheduling).finally(() => {
            setMessageSnackBar({message: `Agendamento ${statusValue(status)?.toLowerCase()} com sucesso`, type: 'success'})
            handleGetSchedulingsByUser()
        })
    }

    return (
        <div className="pt-4">
            {
                schedulings.length > 0 ?
                    <CommonTable headers={tableHeaders} rows={tableRowMold} actions={['edit', 'cancel', 'view', 'status']} handleEdit={(schedulingId) => {
                        setSchedulingToEdit(schedulingId)
                        setOpenedModalEdit(true)
                    }}
                        handleView={(schedulingId) => {
                            setSchedulingToEdit(schedulingId)
                            setOnlyView(true)
                            setOpenedSeeDetails(true)
                        }}
                        handleChangeStatus={(status, id) => handleChangeSchedulingStatus(status, id)}
                    /> :
                    <Card>
                        <CardContent>
                            <p className="text-center text-xl font-semibold bg-[##F8F7F3]">Nenhum registro encontrado</p>
                        </CardContent>
                    </Card>
            }
            <ModalEditScheduling opened={openedEdit} handleClose={() => setOpenedModalEdit(false)} schedulingMadeId={schedulingToEdit} />
            <ModalSeeDetails
                schedulingMadeId={schedulingToEdit}
                opened={openedSeeDetails}
                handleClose={() => setOpenedSeeDetails(false)}
            />
            {messageSnackBar &&
                <CommonSnackBar opened={!!messageSnackBar.message} message={messageSnackBar.message} type={messageSnackBar.type} handleClose={() => { setMessageSnackBar(null) }} />
            }
        </div>
    )
}

export default YourSchedulings
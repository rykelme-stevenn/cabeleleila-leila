import { useEffect } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { getSchedulings, getServices } from "../../service/operational";
import { useDispatch, useSelector } from "react-redux";
import { setServices } from "../../store/reducers/services/services";
import { RootState } from "../../store";
import Divider from "@mui/material/Divider";
import { formatarMoedaReal } from "../../utils/functions";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { PrimaryButton } from "../../Components/Buttons/Buttons";
import { useNavigate } from "react-router-dom";
import YourSchedulings from "./YourSchedulings/YourSchedulings";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Dashboard from "./Dashboard/Dashboard";
import { setScheduling } from "../../store/reducers/scheduling/scheduling";

const Home = () => {
    const services = useSelector((state: RootState) => state.services.services);
    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getStoreServices();
        getStoreSchedulings()
    }, []);

    async function getStoreServices() {
        try {
            const response = await getServices();
            dispatch(setServices(response));
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    }

    async function getStoreSchedulings() {
        let response = await getSchedulings();
        if (response) {
            dispatch(setScheduling(response))
        }
    }

    return (
        <div>
            <NavBar />
            <div className="px-4 lg:px-16 lg:py-12 py-4">
                {
                    user?.owner && (
                        <div className="pt-6 mb-12" >
                            <h3 className="text-4xl font-semibold">Dashboard</h3>
                            <Dashboard />
                        </div>)
                }
                <h3 className="text-4xl font-semibold">Serviços</h3>
                <div className="lg:grid lg:grid-cols-6">
                    <div className="mt-5 lg:col-span-4">
                        {services && services.map((item, index) => (
                            <>
                                <div className="flex justify-between items-center py-6 px-2">
                                    <div className="">
                                        <p className="font-semibold">{item.name}</p>
                                        <div className="flex items-center ">
                                            <p className="text-base font-medium text-[#159343] mr-6">{formatarMoedaReal(item?.value)}</p>
                                            <AccessTimeIcon style={{ width: 14 }} />
                                            <p className="ml-1">{item?.estimated_time} min</p>
                                        </div>
                                    </div>
                                    <div>
                                        <PrimaryButton type="button" label="Agendar" onPress={() => navigate('/agendamento', {
                                            state: { service: item }
                                        })} />
                                    </div>
                                </div>
                                {!((services?.length - 1) === index) && <Divider />}
                            </>
                        ))}
                    </div>
                    <div className="col-span-2 rounded-lg p-4">
                        <Card className="">
                            <CardContent>
                                <div className="mb-3">
                                    <p className="text-base font-semibold">Localização</p>
                                    <p className="text-base font-ligth">Vila Princesa, 705 - 96010-000</p>
                                    <p className="text-base font-ligth">Pelotas - RS</p>
                                </div>
                                <div className="mb-3">
                                    <p className="text-base font-semibold">Formas de pagamento</p>
                                    <div className="flex gap-2 mt-1">
                                        <Chip label="Dinheiro" />
                                        <Chip label="Cartão" />
                                        <Chip label="Pix" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-base font-semibold">Contato</p>
                                    <p className="text-base font-ligth">(13) 99368-1442</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="pt-6" >
                    <h3 className="text-4xl font-semibold">{user?.owner ? 'Agendamentos' : 'Seus agendamentos'}</h3>
                    <YourSchedulings />
                </div>
            </div>
        </div>
    );
};

export default Home;
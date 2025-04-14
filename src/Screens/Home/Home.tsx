import { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { getServices } from "../../service/operational";
import { useDispatch, useSelector } from "react-redux";
import { setServices } from "../../store/reducers/services/services";
import { RootState } from "../../store";
import Divider from "@mui/material/Divider";
import { formatarMoedaReal } from "../../utils/functions";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { SecondaryButton } from "../../Components/Buttons/Buttons";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const services = useSelector((state: RootState) => state.services.services);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getStoreServices();
    }, []);

    async function getStoreServices() {
        try {
            const response = await getServices();
            dispatch(setServices(response));
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    }

    return (
        <div>
            <NavBar />
            <div className="px-16 py-12">
                <h3 className="text-4xl font-semibold">Serviços</h3>
                <div className="grid grid-cols-6">
                    <div className="mt-5 col-span-4">
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
                                        <SecondaryButton type="button" label="Agendar" onPress={() => navigate('/agendamento', {
                                            state: { service: item }
                                        })}/>
                                    </div>
                                </div>
                                {!((services?.length - 1) === index) && <Divider />}
                            </>
                        ))}
                    </div>
                    <div className="col-span-2 bg-red-600">

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
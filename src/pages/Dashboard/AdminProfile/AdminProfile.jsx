import Loading from "../../../component/Loading/Loading";
import useAllPost from "../../../hook/useAllPost";
import useAllUser from "../../../hook/useAllUser";
import useComments from "../../../hook/useComments";
import useCurrentUser from "../../../hook/useCurrentUser";
import { Cell,  Legend, Pie, PieChart,} from 'recharts';


const AdminProfile = () => {


    const { currentUser, isLoading } = useCurrentUser();
    const { posts } = useAllPost()
    const { comments } = useComments()
    const { users } = useAllUser('')


    if (isLoading) {
        return <Loading></Loading>
    }
    console.log(currentUser[0]);

    const { email: userEmail, name, image } = currentUser[0];


    const data = [
        { name: "Total Post", value: posts.length },
        { name: "Total Comment", value: comments.length },
        { name: "Total User", value: users.length }
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FF8042"];

    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
        const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    return (
        <div>
            <div className="flex justify-center ">
                <div className=" py-2">
                    <div className="flex justify-center">
                        <img className="w-20 h-20 rounded-full" src={image} />
                    </div>

                    <div className="text-center">
                        <h2 className="text-xl font-bold ">{name}</h2>
                        <h2 className="font-semibold ">{userEmail}</h2>

                    </div>

                </div>
            </div>
            <hr />
            <div className="flex justify-between mt-8">
                <h3 className="text-2xl font-semibold">Total Post: {posts.length}</h3>
                <h3 className="text-2xl font-semibold">Total comment: {comments.length}</h3>
                <h3 className="text-2xl font-semibold">Total user: {users.length}</h3>
            </div>
            <hr className="mt-3" />

          <div className="flex justify-center ">
                <div>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={data}
                            cx={200}
                            cy={200}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend></Legend>
                    </PieChart>
                </div>
          </div>

        </div>
    )
};

export default AdminProfile;
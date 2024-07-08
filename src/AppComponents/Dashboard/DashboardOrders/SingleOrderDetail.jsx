import DashboardSingleUserOrder from './DashboardSingleUserOrder';

function SingleOrderDetail({ index,item }) {
  
    let millisecondsFromSeconds = item.date.seconds * 1000;
    let millisecondsFromNanoseconds = item.date.nanoseconds / 1000000;
    let totalMilliseconds = millisecondsFromSeconds + millisecondsFromNanoseconds;

    let date = new Date(totalMilliseconds);
    let result= date.toString();
    let time = result?.split("GMT+0500")[0];
    if (date.getHours() > 12) time = time+ "Pm"
    else  time = time + "Am"


  return (
    <tr className={`h-[130px] font-medium`}>
      <td className="border border-1 text-center">
        <p className={`w-[100px] `}>{index + 1}</p>
      </td>
      <td className={` border border-1 p-3 text-center`}>
        <div className="w-[250px] ">
          <p>{item.customer_id}</p>
        </div>
      </td>
      <td className={`border border-1 text-center`}>
        <label htmlFor="" className={`w-[300px]`}>
          {item.customer_email}
        </label>
      </td>

      <td className={`text-center border border-1 text-center`}>
        <label htmlFor="" className={`w-[300px]`}>
                  {item.id}
        </label>
      </td>

      <td className={`border border-1 text-center`}>
        <label className={` w-[300px]`}>{time}</label>
          </td>
          
      <td className={`border`}>
        <label className={` w-[100px]   text-center `}>Confirmed</label>
      </td>

      <td className={`border border-1 text-center `}>
        <DashboardSingleUserOrder   item={item} />
      </td>
        
    </tr>
  );
}

export default SingleOrderDetail;

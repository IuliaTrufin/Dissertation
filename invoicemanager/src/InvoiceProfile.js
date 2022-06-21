import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const InvoiceProfile = ({ user: myUser }) => {
  const [invoiceData, setInvoiceData] = useState(null);
  const [changeOnUser, setChangeOnUser] = useState(null);
  const params = useParams();

  // This function will only run when the component renders the first time
  useEffect(() => {
    const invoiceId = params.id;
    // Call API with invoiceId in get /getInvoiceData/{invoiceId}
    setInvoiceData({ invoiceName: 'test invoice', id: invoiceId, name: 'gudbrand' });
  }, []);

  useEffect(() => {
    // If the user changes then do some action
    if (myUser) {
      setChangeOnUser('hello user');
    } else {
      setChangeOnUser('no user');
    }
  }, [myUser]);

  const { invoiceName, id } = invoiceData || {};
  return (
    <>
      <div>{changeOnUser}</div>
      <div>
        {invoiceName} with id: {id}
      </div>
    </>
  );
};

export default InvoiceProfile;

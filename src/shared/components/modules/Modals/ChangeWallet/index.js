import { ReactComponent as Add } from 'assets/icons/add.svg';
import Logo from 'assets/images/casper-logo.png';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'shared/components/partials';
import { Dialog } from 'shared/components/partials/Dialog/Provider';
import { useQuery } from 'shared/hooks/useQuery';
import { createWallet, getWallet } from 'stores/api/admin/actions';

const ChangeWalletModal = (props) => {
  const { close, guid } = props;

  const [wallet, setWallet] = useState();

  const query = useQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (query.get('guid')) {
      fetchWalletDetail(query.get('guid'));
    }
  }, [query.get('guid')]);

  const fetchWalletDetail = (guid) => {
    dispatch(
      getWallet({ guid }, (res) => {
        setWallet(res.detail);
      })
    );
  };

  const handleCancel = () => {
    close();
  };

  const handleCreateWallet = () => {
    dispatch(
      createWallet({ guid }, (res) => {
        close();
      })
    );
  };

  return (
    <Dialog className='py-12 px-16' showCloseBtn={false} close={close}>
      <Dialog.Header
        title='Change Wallet'
        subTitle='This action will change the deposit wallet. The old wallet will become inactive but can still be viewed in
              the wallets table. This action can not be undone.'
      />
      <Dialog.Body className='mt-7.5'>
        <p>
          Current Wallet: <b>{wallet?.address}</b>
        </p>
        <p className='flex'>
          CSPR Balance: <img className='ml-2 mr-1 w-4' src={Logo} alt='logo' /> <b>{wallet?.balance}</b>
        </p>
      </Dialog.Body>
      <Dialog.Footer>
        <Button className='w-full mt-6' color='primary' onClick={handleCreateWallet}>
          <Add className='mr-2 text-xs' />
          Generate a new deposit wallet
        </Button>
        <div className='mt-2.5 text-center'>
          <Button variant='text' className='underline' onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Dialog.Footer>
    </Dialog>
  );
};

export default ChangeWalletModal;

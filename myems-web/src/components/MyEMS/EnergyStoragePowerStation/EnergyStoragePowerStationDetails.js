import React, { Fragment, useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  Col,
  CustomInput,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Row,
  Table,
  Spinner,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';
import FalconCardHeader from '../../common/FalconCardHeader';
import MultipleLineChart from '../common/MultipleLineChart';
import { getCookieValue, createCookie, checkEmpty } from '../../../helpers/utils';
import withRedirect from '../../../hoc/withRedirect';
import { withTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';
import { APIBaseURL, settings } from '../../../config';
import useInterval from '../../../hooks/useInterval';
import { useLocation } from 'react-router-dom';
import Datetime from 'react-datetime';
import classNames from 'classnames';

const EnergyStoragePowerStationDetails = ({ setRedirect, setRedirectUrl, t }) => {
  const location = useLocation();
  const energyStoragePowerStationUUID = location.search.split('=')[1];

  useEffect(() => {
    let is_logged_in = getCookieValue('is_logged_in');
    let user_name = getCookieValue('user_name');
    let user_display_name = getCookieValue('user_display_name');
    let user_uuid = getCookieValue('user_uuid');
    let token = getCookieValue('token');
    if (checkEmpty(is_logged_in) || checkEmpty(token) || checkEmpty(user_uuid) || !is_logged_in) {
      setRedirectUrl(`/authentication/basic/login`);
      setRedirect(true);
    } else {
      //update expires time of cookies
      createCookie('is_logged_in', true, settings.cookieExpireTime);
      createCookie('user_name', user_name, settings.cookieExpireTime);
      createCookie('user_display_name', user_display_name, settings.cookieExpireTime);
      createCookie('user_uuid', user_uuid, settings.cookieExpireTime);
      createCookie('token', token, settings.cookieExpireTime);
    }
  });

  useEffect(() => {
    let timer = setInterval(() => {
      let is_logged_in = getCookieValue('is_logged_in');
      if (is_logged_in === null || !is_logged_in) {
        setRedirectUrl(`/authentication/basic/login`);
        setRedirect(true);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [setRedirect, setRedirectUrl]);

  const [activeTabLeft, setActiveTabLeft] = useState('1');
  const toggleTabLeft = tab => {
    if (activeTabLeft !== tab) setActiveTabLeft(tab);
  };

  const [activeTabRight, setActiveTabRight] = useState('1');
  const toggleTabRight = tab => {
    if (activeTabRight !== tab) setActiveTabRight(tab);
  };

  const [activeTabBottom, setActiveTabBottom] = useState('1');
  const toggleTabBottom = tab => {
    if (activeTabBottom !== tab) setActiveTabBottom(tab);
  };

  // State
  const [chargeStartTime1, setChargeStartTime1] = useState(null);
  const [chargeEndTime1, setChargeEndTime1] = useState(null);
  const [chargeStartTime2, setChargeStartTime2] = useState(null);
  const [chargeEndTime2, setChargeEndTime2] = useState(null);
  const [chargeStartTime3, setChargeStartTime3] = useState(null);
  const [chargeEndTime3, setChargeEndTime3] = useState(null);
  const [chargeStartTime4, setChargeStartTime4] = useState(null);
  const [chargeEndTime4, setChargeEndTime4] = useState(null);
  const [dischargeStartTime1, setDischargeStartTime1] = useState(null);
  const [dischargeEndTime1, setDischargeEndTime1] = useState(null);
  const [dischargeStartTime2, setDischargeStartTime2] = useState(null);
  const [dischargeEndTime2, setDischargeEndTime2] = useState(null);
  const [dischargeStartTime3, setDischargeStartTime3] = useState(null);
  const [dischargeEndTime3, setDischargeEndTime3] = useState(null);
  const [dischargeStartTime4, setDischargeStartTime4] = useState(null);
  const [dischargeEndTime4, setDischargeEndTime4] = useState(null);

  const [chargeStartTime1CommandID, setChargeStartTime1CommandID] = useState(null);
  const [chargeEndTime1CommandID, setChargeEndTime1CommandID] = useState(null);
  const [chargeStartTime2CommandID, setChargeStartTime2CommandID] = useState(null);
  const [chargeEndTime2CommandID, setChargeEndTime2CommandID] = useState(null);
  const [chargeStartTime3CommandID, setChargeStartTime3CommandID] = useState(null);
  const [chargeEndTime3CommandID, setChargeEndTime3CommandID] = useState(null);
  const [chargeStartTime4CommandID, setChargeStartTime4CommandID] = useState(null);
  const [chargeEndTime4CommandID, setChargeEndTime4CommandID] = useState(null);
  const [dischargeStartTime1CommandID, setDischargeStartTime1CommandID] = useState(null);
  const [dischargeEndTime1CommandID, setDischargeEndTime1CommandID] = useState(null);
  const [dischargeStartTime2CommandID, setDischargeStartTime2CommandID] = useState(null);
  const [dischargeEndTime2CommandID, setDischargeEndTime2CommandID] = useState(null);
  const [dischargeStartTime3CommandID, setDischargeStartTime3CommandID] = useState(null);
  const [dischargeEndTime3CommandID, setDischargeEndTime3CommandID] = useState(null);
  const [dischargeStartTime4CommandID, setDischargeStartTime4CommandID] = useState(null);
  const [dischargeEndTime4CommandID, setDischargeEndTime4CommandID] = useState(null);

  //Results

  const [energyStoragePowerStationName, setEnergyStoragePowerStationName] = useState();
  const [energyStoragePowerStationAddress, setEnergyStoragePowerStationAddress] = useState();
  const [energyStoragePowerStationPostalCode, setEnergyStoragePowerStationPostalCode] = useState();
  const [energyStoragePowerStationCapacity, setEnergyStoragePowerStationCapacity] = useState();
  const [energyStoragePowerStationLatitude, setEnergyStoragePowerStationLatitude] = useState();
  const [energyStoragePowerStationLongitude, setEnergyStoragePowerStationLongitude] = useState();
  const [energyStoragePowerStationSVG, setEnergyStoragePowerStationSVG] = useState();

  const [parameterLineChartLabels, setParameterLineChartLabels] = useState([]);
  const [parameterLineChartData, setParameterLineChartData] = useState({});
  const [parameterLineChartOptions, setParameterLineChartOptions] = useState([]);

  useEffect(() => {
    let isResponseOK = false;
    fetch(APIBaseURL + '/reports/energystoragepowerstationdetails?uuid=' + energyStoragePowerStationUUID, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'User-UUID': getCookieValue('user_uuid'),
        Token: getCookieValue('token')
      },
      body: null
    })
      .then(response => {
        if (response.ok) {
          isResponseOK = true;
        }
        return response.json();
      })
      .then(json => {
        if (isResponseOK) {
          console.log(json);
          setEnergyStoragePowerStationName(json['energy_storage_power_station']['name']);
          setEnergyStoragePowerStationAddress(json['energy_storage_power_station']['address']);
          setEnergyStoragePowerStationPostalCode(json['energy_storage_power_station']['postal_code']);
          setEnergyStoragePowerStationCapacity(json['energy_storage_power_station']['capacity']);
          setEnergyStoragePowerStationLatitude(json['energy_storage_power_station']['latitude']);
          setEnergyStoragePowerStationLongitude(json['energy_storage_power_station']['longitude']);
          setEnergyStoragePowerStationSVG({ __html: json['energy_storage_power_station']['svg'] });
          let timestamps = {};
          json['parameters']['timestamps'].forEach((currentValue, index) => {
            timestamps['a' + index] = currentValue;
          });
          setParameterLineChartLabels(timestamps);

          let values = {};
          json['parameters']['values'].forEach((currentValue, index) => {
            values['a' + index] = currentValue;
          });
          setParameterLineChartData(values);

          let names = [];
          json['parameters']['names'].forEach((currentValue, index) => {
            names.push({ value: 'a' + index, label: currentValue });
          });
          setParameterLineChartOptions(names);

          setChargeStartTime1(json['schedule']['charge_start_time1']);
          setChargeEndTime1(json['schedule']['charge_end_time1']);
          setChargeStartTime2(json['schedule']['charge_start_time2']);
          setChargeEndTime2(json['schedule']['charge_end_time2']);
          setChargeStartTime3(json['schedule']['charge_start_time3']);
          setChargeEndTime3(json['schedule']['charge_end_time3']);
          setChargeStartTime4(json['schedule']['charge_start_time4']);
          setChargeEndTime4(json['schedule']['charge_end_time4']);

          setDischargeStartTime1(json['schedule']['discharge_start_time1']);
          setDischargeEndTime1(json['schedule']['discharge_end_time1']);
          setDischargeStartTime2(json['schedule']['discharge_start_time2']);
          setDischargeEndTime2(json['schedule']['discharge_end_time2']);
          setDischargeStartTime3(json['schedule']['discharge_start_time3']);
          setDischargeEndTime3(json['schedule']['discharge_end_time3']);
          setDischargeStartTime4(json['schedule']['discharge_start_time4']);
          setDischargeEndTime4(json['schedule']['discharge_end_time4']);

          setChargeStartTime1CommandID(json['schedule']['charge_start_time1_command_id']);
          setChargeEndTime1CommandID(json['schedule']['charge_end_time1_command_id']);
          setChargeStartTime2CommandID(json['schedule']['charge_start_time2_command_id']);
          setChargeEndTime2CommandID(json['schedule']['charge_end_time2_command_id']);
          setChargeStartTime3CommandID(json['schedule']['charge_start_time3_command_id']);
          setChargeEndTime3CommandID(json['schedule']['charge_end_time3_command_id']);
          setChargeStartTime4CommandID(json['schedule']['charge_start_time4_command_id']);
          setChargeEndTime4CommandID(json['schedule']['charge_end_time4_command_id']);

          setDischargeStartTime1CommandID(json['schedule']['discharge_start_time1_command_id']);
          setDischargeEndTime1CommandID(json['schedule']['discharge_end_time1_command_id']);
          setDischargeStartTime2CommandID(json['schedule']['discharge_start_time2_command_id']);
          setDischargeEndTime2CommandID(json['schedule']['discharge_end_time2_command_id']);
          setDischargeStartTime3CommandID(json['schedule']['discharge_start_time3_command_id']);
          setDischargeEndTime3CommandID(json['schedule']['discharge_end_time3_command_id']);
          setDischargeStartTime4CommandID(json['schedule']['discharge_start_time4_command_id']);
          setDischargeEndTime4CommandID(json['schedule']['discharge_end_time4_command_id']);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [energyStoragePowerStationUUID]);

  const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';

  const refreshSVGData = () => {
    let isResponseOK = false;
    fetch(APIBaseURL + '/reports/pointrealtime', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'User-UUID': getCookieValue('user_uuid'),
        Token: getCookieValue('token')
      },
      body: null
    })
      .then(response => {
        if (response.ok) {
          isResponseOK = true;
        }
        return response.json();
      })
      .then(json => {
        if (isResponseOK) {
          console.log(json);
          json.forEach(currentPoint => {
            let textElement = document.getElementById('PT' + currentPoint['point_id']);
            if (textElement) {
              let tspanList = textElement.getElementsByTagName('tspan');
              if (tspanList && tspanList.length > 0) {
                let tspanElement = tspanList[tspanList.length - 1];
                tspanElement.textContent = parseFloat(currentPoint['value']).toFixed(2);
              } else {
                textElement.textContent = parseFloat(currentPoint['value']).toFixed(2);
              }
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useInterval(() => {
    refreshSVGData();
  }, 1000 * 10);

  // Callback fired when ChargeStartTime1 change
  const onChargeStartTime1Change = moment => {
    setChargeStartTime1(moment.format('HH:mm'));
  };
  // Callback fired when ChargeStartTime1 close
  const onChargeStartTime1Close = () => {
    let isResponseOK = false;
    fetch(APIBaseURL + '/commands/' + chargeStartTime1CommandID + '/send', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'User-UUID': getCookieValue('user_uuid'),
        Token: getCookieValue('token')
      },
      // convert HH:mm to set value, shift HH 8 bits to left and then plus mm
      body: JSON.stringify({
        data: { set_value: parseInt(chargeStartTime1.substring(0, 2)) * 256 + parseInt(chargeStartTime1.substring(3)) }
      })
    })
      .then(response => {
        if (response.ok) {
          isResponseOK = true;
        }
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
  };
  // Callback fired when ChargeEndTime1 change
  const onChargeEndTime1Change = moment => {
    setChargeEndTime1(moment.format('HH:mm'));
  };
  // Callback fired when ChargeEndTime1 close
  const onChargeEndTime1Close = () => {
    let isResponseOK = false;
    fetch(APIBaseURL + '/commands/' + chargeEndTime1CommandID + '/send', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'User-UUID': getCookieValue('user_uuid'),
        Token: getCookieValue('token')
      },
      // convert HH:mm to set value, shift HH 8 bits to left and then plus mm
      body: JSON.stringify({
        data: { set_value: parseInt(chargeEndTime1.substring(0, 2)) * 256 + parseInt(chargeEndTime1.substring(3)) }
      })
    })
      .then(response => {
        if (response.ok) {
          isResponseOK = true;
        }
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
  };
  // Callback fired when DischargeStartTime1 change
  const onDischargeStartTime1Change = moment => {
    setDischargeStartTime1(moment.format('HH:mm'));
  };
  // Callback fired when DischargeStartTime1 close
  const onDischargeStartTime1Close = () => {
    let isResponseOK = false;
    fetch(APIBaseURL + '/commands/' + dischargeStartTime1CommandID + '/send', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'User-UUID': getCookieValue('user_uuid'),
        Token: getCookieValue('token')
      },
      // convert HH:mm to set value, shift HH 8 bits to left and then plus mm
      body: JSON.stringify({
        data: {
          set_value: parseInt(dischargeStartTime1.substring(0, 2)) * 256 + parseInt(dischargeStartTime1.substring(3))
        }
      })
    })
      .then(response => {
        if (response.ok) {
          isResponseOK = true;
        }
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
  };
  // Callback fired when DischargeEndTime1 change
  const onDischargeEndTime1Change = moment => {
    setDischargeEndTime1(moment.format('HH:mm'));
  };
  // Callback fired when DischargeEndTime1 close
  const onDischargeEndTime1Close = () => {
    let isResponseOK = false;
    fetch(APIBaseURL + '/commands/' + dischargeEndTime1CommandID + '/send', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'User-UUID': getCookieValue('user_uuid'),
        Token: getCookieValue('token')
      },
      // convert HH:mm to set value, shift HH 8 bits to left and then plus mm
      body: JSON.stringify({
        data: {
          set_value: parseInt(dischargeEndTime1.substring(0, 2)) * 256 + parseInt(dischargeEndTime1.substring(3))
        }
      })
    })
      .then(response => {
        if (response.ok) {
          isResponseOK = true;
        }
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Callback fired when ChargeStartTime2 change
  const onChargeStartTime2Change = moment => {
    setChargeStartTime2(moment.format('HH:mm'));
  };
  // Callback fired when ChargeStartTime2 close
  const onChargeStartTime2Close = () => {
    let isResponseOK = false;
    fetch(APIBaseURL + '/commands/' + chargeStartTime2CommandID + '/send', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'User-UUID': getCookieValue('user_uuid'),
        Token: getCookieValue('token')
      },
      // convert HH:mm to set value, shift HH 8 bits to left and then plus mm
      body: JSON.stringify({
        data: { set_value: parseInt(chargeStartTime2.substring(0, 2)) * 256 + parseInt(chargeStartTime2.substring(3)) }
      })
    })
      .then(response => {
        if (response.ok) {
          isResponseOK = true;
        }
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
  };
  // Callback fired when ChargeEndTime2 change
  const onChargeEndTime2Change = moment => {
    setChargeEndTime2(moment.format('HH:mm'));
  };
  // Callback fired when ChargeEndTime2 close
  const onChargeEndTime2Close = () => {
    let isResponseOK = false;
    fetch(APIBaseURL + '/commands/' + chargeEndTime2CommandID + '/send', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'User-UUID': getCookieValue('user_uuid'),
        Token: getCookieValue('token')
      },
      // convert HH:mm to set value, shift HH 8 bits to left and then plus mm
      body: JSON.stringify({
        data: { set_value: parseInt(chargeEndTime2.substring(0, 2)) * 256 + parseInt(chargeEndTime2.substring(3)) }
      })
    })
      .then(response => {
        if (response.ok) {
          isResponseOK = true;
        }
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
  };
  // Callback fired when DischargeStartTime2 change
  const onDischargeStartTime2Change = moment => {
    setDischargeStartTime2(moment.format('HH:mm'));
  };
  // Callback fired when DischargeStartTime2 close
  const onDischargeStartTime2Close = () => {
    let isResponseOK = false;
    fetch(APIBaseURL + '/commands/' + dischargeStartTime2CommandID + '/send', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'User-UUID': getCookieValue('user_uuid'),
        Token: getCookieValue('token')
      },
      // convert HH:mm to set value, shift HH 8 bits to left and then plus mm
      body: JSON.stringify({
        data: {
          set_value: parseInt(dischargeStartTime2.substring(0, 2)) * 256 + parseInt(dischargeStartTime2.substring(3))
        }
      })
    })
      .then(response => {
        if (response.ok) {
          isResponseOK = true;
        }
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
  };
  // Callback fired when DischargeEndTime2 change
  const onDischargeEndTime2Change = moment => {
    setDischargeEndTime2(moment.format('HH:mm'));
  };
  // Callback fired when DischargeEndTime2 close
  const onDischargeEndTime2Close = () => {
    let isResponseOK = false;
    fetch(APIBaseURL + '/commands/' + dischargeEndTime2CommandID + '/send', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'User-UUID': getCookieValue('user_uuid'),
        Token: getCookieValue('token')
      },
      // convert HH:mm to set value, shift HH 8 bits to left and then plus mm
      body: JSON.stringify({
        data: {
          set_value: parseInt(dischargeEndTime2.substring(0, 2)) * 256 + parseInt(dischargeEndTime2.substring(3))
        }
      })
    })
      .then(response => {
        if (response.ok) {
          isResponseOK = true;
        }
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Callback fired when ChargeStartTime3 change
  const onChargeStartTime3Change = moment => {
    setChargeStartTime3(moment.format('HH:mm'));
  };
  // Callback fired when ChargeStartTime3 close
  const onChargeStartTime3Close = () => {
    let isResponseOK = false;
    fetch(APIBaseURL + '/commands/' + chargeStartTime3CommandID + '/send', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'User-UUID': getCookieValue('user_uuid'),
        Token: getCookieValue('token')
      },
      // convert HH:mm to set value, shift HH 8 bits to left and then plus mm
      body: JSON.stringify({
        data: { set_value: parseInt(chargeStartTime3.substring(0, 2)) * 256 + parseInt(chargeStartTime3.substring(3)) }
      })
    })
      .then(response => {
        if (response.ok) {
          isResponseOK = true;
        }
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
  };
  // Callback fired when ChargeEndTime3 change
  const onChargeEndTime3Change = moment => {
    setChargeEndTime3(moment.format('HH:mm'));
  };
  // Callback fired when ChargeEndTime3 close
  const onChargeEndTime3Close = () => {
    let isResponseOK = false;
    fetch(APIBaseURL + '/commands/' + chargeEndTime3CommandID + '/send', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'User-UUID': getCookieValue('user_uuid'),
        Token: getCookieValue('token')
      },
      // convert HH:mm to set value, shift HH 8 bits to left and then plus mm
      body: JSON.stringify({
        data: { set_value: parseInt(chargeEndTime3.substring(0, 2)) * 256 + parseInt(chargeEndTime3.substring(3)) }
      })
    })
      .then(response => {
        if (response.ok) {
          isResponseOK = true;
        }
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
  };
  // Callback fired when DischargeStartTime3 change
  const onDischargeStartTime3Change = moment => {
    setDischargeStartTime3(moment.format('HH:mm'));
  };
  // Callback fired when DischargeStartTime3 close
  const onDischargeStartTime3Close = () => {
    let isResponseOK = false;
    fetch(APIBaseURL + '/commands/' + dischargeStartTime3CommandID + '/send', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'User-UUID': getCookieValue('user_uuid'),
        Token: getCookieValue('token')
      },
      // convert HH:mm to set value, shift HH 8 bits to left and then plus mm
      body: JSON.stringify({
        data: {
          set_value: parseInt(dischargeStartTime3.substring(0, 2)) * 256 + parseInt(dischargeStartTime3.substring(3))
        }
      })
    })
      .then(response => {
        if (response.ok) {
          isResponseOK = true;
        }
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
  };
  // Callback fired when DischargeEndTime3 change
  const onDischargeEndTime3Change = moment => {
    setDischargeEndTime3(moment.format('HH:mm'));
  };
  // Callback fired when DischargeEndTime3 close
  const onDischargeEndTime3Close = () => {
    let isResponseOK = false;
    fetch(APIBaseURL + '/commands/' + dischargeEndTime3CommandID + '/send', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'User-UUID': getCookieValue('user_uuid'),
        Token: getCookieValue('token')
      },
      // convert HH:mm to set value, shift HH 8 bits to left and then plus mm
      body: JSON.stringify({
        data: {
          set_value: parseInt(dischargeEndTime3.substring(0, 2)) * 256 + parseInt(dischargeEndTime3.substring(3))
        }
      })
    })
      .then(response => {
        if (response.ok) {
          isResponseOK = true;
        }
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Callback fired when ChargeStartTime4 change
  const onChargeStartTime4Change = moment => {
    setChargeStartTime4(moment.format('HH:mm'));
  };
  // Callback fired when ChargeStartTime4 close
  const onChargeStartTime4Close = () => {
    let isResponseOK = false;
    fetch(APIBaseURL + '/commands/' + chargeStartTime4CommandID + '/send', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'User-UUID': getCookieValue('user_uuid'),
        Token: getCookieValue('token')
      },
      // convert HH:mm to set value, shift HH 8 bits to left and then plus mm
      body: JSON.stringify({
        data: { set_value: parseInt(chargeStartTime4.substring(0, 2)) * 256 + parseInt(chargeStartTime4.substring(3)) }
      })
    })
      .then(response => {
        if (response.ok) {
          isResponseOK = true;
        }
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
  };
  // Callback fired when ChargeEndTime4 change
  const onChargeEndTime4Change = moment => {
    setChargeEndTime4(moment.format('HH:mm'));
  };
  // Callback fired when ChargeEndTime4 close
  const onChargeEndTime4Close = () => {
    let isResponseOK = false;
    fetch(APIBaseURL + '/commands/' + chargeEndTime4CommandID + '/send', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'User-UUID': getCookieValue('user_uuid'),
        Token: getCookieValue('token')
      },
      // convert HH:mm to set value, shift HH 8 bits to left and then plus mm
      body: JSON.stringify({
        data: { set_value: parseInt(chargeEndTime4.substring(0, 2)) * 256 + parseInt(chargeEndTime4.substring(3)) }
      })
    })
      .then(response => {
        if (response.ok) {
          isResponseOK = true;
        }
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
  };
  // Callback fired when DischargeStartTime4 change
  const onDischargeStartTime4Change = moment => {
    setDischargeStartTime4(moment.format('HH:mm'));
  };
  // Callback fired when DischargeStartTime4 close
  const onDischargeStartTime4Close = () => {
    let isResponseOK = false;
    fetch(APIBaseURL + '/commands/' + dischargeStartTime4CommandID + '/send', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'User-UUID': getCookieValue('user_uuid'),
        Token: getCookieValue('token')
      },
      // convert HH:mm to set value, shift HH 8 bits to left and then plus mm
      body: JSON.stringify({
        data: {
          set_value: parseInt(dischargeStartTime4.substring(0, 2)) * 256 + parseInt(dischargeStartTime4.substring(3))
        }
      })
    })
      .then(response => {
        if (response.ok) {
          isResponseOK = true;
        }
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
  };
  // Callback fired when DischargeEndTime4 change
  const onDischargeEndTime4Change = moment => {
    setDischargeEndTime4(moment.format('HH:mm'));
  };
  // Callback fired when DischargeEndTime4 close
  const onDischargeEndTime4Close = () => {
    let isResponseOK = false;
    fetch(APIBaseURL + '/commands/' + dischargeEndTime4CommandID + '/send', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'User-UUID': getCookieValue('user_uuid'),
        Token: getCookieValue('token')
      },
      // convert HH:mm to set value, shift HH 8 bits to left and then plus mm
      body: JSON.stringify({
        data: {
          set_value: parseInt(dischargeEndTime4.substring(0, 2)) * 256 + parseInt(dischargeEndTime4.substring(3))
        }
      })
    })
      .then(response => {
        if (response.ok) {
          isResponseOK = true;
        }
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <Row noGutters>
        <Col lg="2" className="pr-lg-2">
          <Nav tabs>
            <NavItem className="cursor-pointer">
              <NavLink
                className={classNames({ active: activeTabLeft === '1' })}
                onClick={() => {
                  toggleTabLeft('1');
                }}
              >
                <h6>电量指标</h6>
              </NavLink>
            </NavItem>
            <NavItem className="cursor-pointer">
              <NavLink
                className={classNames({ active: activeTabLeft === '2' })}
                onClick={() => {
                  toggleTabLeft('2');
                }}
              >
                <h6>收益指标</h6>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTabLeft}>
            <TabPane tabId="1">
              <Card className="mb-3 fs--1">
                <Fragment>
                  <CardBody className="pt-0">
                    <Table borderless className="fs--1 mb-0">
                      <tbody>
                        <tr className="border-bottom">
                          <th className="pl-0">今日充电量</th>
                          <th className="pr-0 text-right">100 kWh</th>
                        </tr>
                        <tr className="border-bottom">
                          <th className="pl-0">今日放电量</th>
                          <th className="pr-0 text-right ">100 kWh</th>
                        </tr>
                        <tr className="border-bottom">
                          <th className="pl-0 pb-0">累计充电量</th>
                          <th className="pr-0 text-right">1000 kWh</th>
                        </tr>
                        <tr className="border-bottom">
                          <th className="pl-0 pb-0">累计放电量</th>
                          <th className="pr-0 text-right">1000 kWh</th>
                        </tr>
                        <tr className="border-bottom">
                          <th className="pl-0 pb-0">综合效率</th>
                          <th className="pr-0 text-right">99%</th>
                        </tr>
                        <tr className="border-bottom">
                          <th className="pl-0 pb-0">放电达成率</th>
                          <th className="pr-0 text-right">150%</th>
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                </Fragment>
              </Card>
            </TabPane>
            <TabPane tabId="2">
              <Card className="mb-3 fs--1">
                <Fragment>
                  <CardBody className="pt-0">
                    <Table borderless className="fs--1 mb-0">
                      <tbody>
                        <tr className="border-bottom">
                          <th className="pl-0">今日成本</th>
                          <th className="pr-0 text-right">100 元</th>
                        </tr>
                        <tr className="border-bottom">
                          <th className="pl-0">今日收入</th>
                          <th className="pr-0 text-right ">200 元</th>
                        </tr>
                        <tr className="border-bottom">
                          <th className="pl-0 pb-0">累计成本</th>
                          <th className="pr-0 text-right">1000 元</th>
                        </tr>
                        <tr className="border-bottom">
                          <th className="pl-0 pb-0">累计收入</th>
                          <th className="pr-0 text-right">2000 元</th>
                        </tr>
                        <tr className="border-bottom">
                          <th className="pl-0 pb-0">今日盈利</th>
                          <th className="pr-0 text-right">100 元</th>
                        </tr>
                        <tr className="border-bottom">
                          <th className="pl-0 pb-0">累计盈利</th>
                          <th className="pr-0 text-right">1000 元</th>
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                </Fragment>
              </Card>
            </TabPane>
          </TabContent>
        </Col>
        <Col lg="8" className="pr-lg-2" key={uuid()}>
          <div dangerouslySetInnerHTML={energyStoragePowerStationSVG} />
        </Col>
        <Col lg="2" className="pr-lg-2">
          <Nav tabs>
            <NavItem className="cursor-pointer">
              <NavLink
                className={classNames({ active: activeTabRight === '1' })}
                onClick={() => {
                  toggleTabRight('1');
                }}
              >
                <h6>{t('General Information')}</h6>
              </NavLink>
            </NavItem>
            <NavItem className="cursor-pointer">
              <NavLink
                className={classNames({ active: activeTabRight === '2' })}
                onClick={() => {
                  toggleTabRight('2');
                }}
              >
                <h6>设备状态</h6>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTabRight}>
            <TabPane tabId="1">
              <Card className="mb-3 fs--1">
                <Fragment>
                  <CardBody className="pt-0">
                    <Table borderless className="fs--1 mb-0">
                      <tbody>
                        <tr className="border-bottom">
                          <th className="pl-0">{t('Name')}</th>
                          <th className="pr-0 text-right">{energyStoragePowerStationName}</th>
                        </tr>
                        <tr className="border-bottom">
                          <th className="pl-0">{t('Address')}</th>
                          <th className="pr-0 text-right ">{energyStoragePowerStationAddress}</th>
                        </tr>
                        <tr className="border-bottom">
                          <th className="pl-0 pb-0">{t('Postal Code')}</th>
                          <th className="pr-0 text-right">{energyStoragePowerStationPostalCode}</th>
                        </tr>
                        <tr className="border-bottom">
                          <th className="pl-0 pb-0">{t('Capacity')} </th>
                          <th className="pr-0 text-right">{energyStoragePowerStationCapacity} kW</th>
                        </tr>
                        <tr className="border-bottom">
                          <th className="pl-0 pb-0">{t('Latitude')}</th>
                          <th className="pr-0 text-right">{energyStoragePowerStationLatitude}</th>
                        </tr>
                        <tr className="border-bottom">
                          <th className="pl-0 pb-0">{t('Longitude')}</th>
                          <th className="pr-0 text-right">{energyStoragePowerStationLongitude}</th>
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                </Fragment>
              </Card>
            </TabPane>
            <TabPane tabId="2">
              <Card className="mb-3 fs--1">
                <Fragment>
                  <CardBody className="pt-0">
                    <Table borderless className="fs--1 mb-0">
                      <tbody>
                        <tr className="border-bottom">
                          <th className="pl-0 pb-0">通信网关</th>
                          <th className="pr-0 text-right">正常</th>
                        </tr>
                        <tr className="border-bottom">
                          <th className="pl-0">1# PCS</th>
                          <th className="pr-0 text-right">正常</th>
                        </tr>
                        <tr className="border-bottom">
                          <th className="pl-0">1#电池堆</th>
                          <th className="pr-0 text-right ">正常</th>
                        </tr>
                        <tr className="border-bottom">
                          <th className="pl-0 pb-0">1#空调</th>
                          <th className="pr-0 text-right">正常</th>
                        </tr>
                        <tr className="border-bottom">
                          <th className="pl-0 pb-0">1#网关表</th>
                          <th className="pr-0 text-right">正常</th>
                        </tr>
                        <tr className="border-bottom">
                          <th className="pl-0 pb-0">1#用户表</th>
                          <th className="pr-0 text-right">正常</th>
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                </Fragment>
              </Card>
            </TabPane>
          </TabContent>
        </Col>
      </Row>

      <Nav tabs>
        <NavItem className="cursor-pointer">
          <NavLink
            className={classNames({ active: activeTabBottom === '1' })}
            onClick={() => {
              toggleTabBottom('1');
            }}
          >
            <h6>{t('Operating Characteristic Curve')}</h6>
          </NavLink>
        </NavItem>
        <NavItem className="cursor-pointer">
          <NavLink
            className={classNames({ active: activeTabBottom === '2' })}
            onClick={() => {
              toggleTabBottom('2');
            }}
          >
            <h6>策略管理</h6>
          </NavLink>
        </NavItem>
        <NavItem className="cursor-pointer">
          <NavLink
            className={classNames({ active: activeTabBottom === '3' })}
            onClick={() => {
              toggleTabBottom('3');
            }}
          >
            <h6>{t('Fault Alarms')}</h6>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTabBottom}>
        <TabPane tabId="1">
          <MultipleLineChart
            reportingTitle=""
            baseTitle=""
            labels={parameterLineChartLabels}
            data={parameterLineChartData}
            options={parameterLineChartOptions}
          />
        </TabPane>
        <TabPane tabId="2">
          <Card className="mb-3 fs--1">
            <CardBody className="bg-light">
              <Table striped className="border-bottom">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{t('Charge Start Time')}</th>
                    <th>{t('Charge End Time')}</th>
                    <th>{t('Discharge Start Time')}</th>
                    <th>{t('Discharge End Time')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>
                      <Datetime
                        dateFormat={false}
                        timeFormat="HH:mm"
                        value={chargeStartTime1}
                        onChange={onChargeStartTime1Change}
                        onClose={onChargeStartTime1Close}
                      />
                    </td>
                    <td>
                      <Datetime
                        dateFormat={false}
                        timeFormat="HH:mm"
                        value={chargeEndTime1}
                        onChange={onChargeEndTime1Change}
                        onClose={onChargeEndTime1Close}
                      />
                    </td>
                    <td>
                      <Datetime
                        dateFormat={false}
                        timeFormat="HH:mm"
                        value={dischargeStartTime1}
                        onChange={onDischargeStartTime1Change}
                        onClose={onDischargeStartTime1Close}
                      />
                    </td>
                    <td>
                      <Datetime
                        dateFormat={false}
                        timeFormat="HH:mm"
                        value={dischargeEndTime1}
                        onChange={onDischargeEndTime1Change}
                        onClose={onDischargeEndTime1Close}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>
                      <Datetime
                        dateFormat={false}
                        timeFormat="HH:mm"
                        value={chargeStartTime2}
                        onChange={onChargeStartTime2Change}
                        onClose={onChargeStartTime2Close}
                      />
                    </td>
                    <td>
                      <Datetime
                        dateFormat={false}
                        timeFormat="HH:mm"
                        value={chargeEndTime2}
                        onChange={onChargeEndTime2Change}
                        onClose={onChargeEndTime2Close}
                      />
                    </td>
                    <td>
                      <Datetime
                        dateFormat={false}
                        timeFormat="HH:mm"
                        value={dischargeStartTime2}
                        onChange={onDischargeStartTime2Change}
                        onClose={onDischargeStartTime2Close}
                      />
                    </td>
                    <td>
                      <Datetime
                        dateFormat={false}
                        timeFormat="HH:mm"
                        value={dischargeEndTime2}
                        onChange={onDischargeEndTime2Change}
                        onClose={onDischargeEndTime2Close}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>
                      <Datetime
                        dateFormat={false}
                        timeFormat="HH:mm"
                        value={chargeStartTime3}
                        onChange={onChargeStartTime3Change}
                        onClose={onChargeStartTime3Close}
                      />
                    </td>
                    <td>
                      <Datetime
                        dateFormat={false}
                        timeFormat="HH:mm"
                        value={chargeEndTime3}
                        onChange={onChargeEndTime3Change}
                        onClose={onChargeEndTime3Close}
                      />
                    </td>
                    <td>
                      <Datetime
                        dateFormat={false}
                        timeFormat="HH:mm"
                        value={dischargeStartTime3}
                        onChange={onDischargeStartTime3Change}
                        onClose={onDischargeStartTime3Close}
                      />
                    </td>
                    <td>
                      <Datetime
                        dateFormat={false}
                        timeFormat="HH:mm"
                        value={dischargeEndTime3}
                        onChange={onDischargeEndTime3Change}
                        onClose={onDischargeEndTime3Close}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>
                      <Datetime
                        dateFormat={false}
                        timeFormat="HH:mm"
                        value={chargeStartTime4}
                        onChange={onChargeStartTime4Change}
                        onClose={onChargeStartTime4Close}
                      />
                    </td>
                    <td>
                      <Datetime
                        dateFormat={false}
                        timeFormat="HH:mm"
                        value={chargeEndTime4}
                        onChange={onChargeEndTime4Change}
                        onClose={onChargeEndTime4Close}
                      />
                    </td>
                    <td>
                      <Datetime
                        dateFormat={false}
                        timeFormat="HH:mm"
                        value={dischargeStartTime4}
                        onChange={onDischargeStartTime4Change}
                        onClose={onDischargeStartTime4Close}
                      />
                    </td>
                    <td>
                      <Datetime
                        dateFormat={false}
                        timeFormat="HH:mm"
                        value={dischargeEndTime4}
                        onChange={onDischargeEndTime4Change}
                        onClose={onDischargeEndTime4Close}
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </TabPane>
        <TabPane tabId="3">
          <Card className="mb-3 fs--1">
            <CardBody className="bg-light">
              <Table striped className="border-bottom">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>主题</th>
                    <th>时间</th>
                    <th>内容</th>
                    <th>状态</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </TabPane>
      </TabContent>
    </Fragment>
  );
};

export default withTranslation()(withRedirect(EnergyStoragePowerStationDetails));

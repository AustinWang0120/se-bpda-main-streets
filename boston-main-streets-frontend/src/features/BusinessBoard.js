import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, FormControl } from "react-bootstrap";
import CardItem from "../components/CardItem";
import BusinessForm from "./BusinessForm";
import { removeMapBusiness, setMapBusiness } from "../reducers/mapBusinessReducer";

const BusinessesBoard = () => {

    // states
    const [modificationMode, setModificationMode] = useState(false)
    const [oneBusiness, setOneBusiness] = useState(null)
    const [keyWord, setKeyWord] = useState('')
    
    // redux states: business, user
    const businessData = useSelector(({ business }) => business).filter((business) => (
        business.business_name.toLowerCase().includes(keyWord.toLowerCase())
    ))
    const user = useSelector(({user}) => user)
    const dispatch = useDispatch()

    // handle view, update and back
    const handleView = (business) => {
        dispatch(setMapBusiness(business))
    }
    const handleUpdate = (business) => {
        setOneBusiness(business)
        setModificationMode(true)
    }
    const handleBack = () => {
        setOneBusiness(null)
        setModificationMode(false)
    }

    if (modificationMode) {
        return (
            <Row>
                <BusinessForm business={oneBusiness} />
                <Button variant="link" onClick={() => handleBack()}>Back</Button>
            </Row>
        )
    }

    return (
        <Row>
            <FormControl type="search" onChange={({target}) => setKeyWord(target.value)} placeholder="Search" value={keyWord} />
            {businessData.map((business, index) => (
                <CardItem key={index} title={business.business_name.toUpperCase()} text={`address: ${business.street_address}`}>
                    <Row>
                        <Col>
                            <Button variant="link" onClick={() => handleView(business)}>View</Button>
                            <Button variant="link" onClick={() => handleView(business)}>Website</Button>
                        </Col>
                        <Col>
                            {
                                user
                                    ? <Button variant="link" onClick={() => handleUpdate(business)}>Update</Button>
                                    : <Button variant="link" onClick={() => handleUpdate(business)} disabled>Update</Button>
                            }
                        </Col>
                    </Row>
                </CardItem>
            ))}
        </Row>
    )
}

export default BusinessesBoard
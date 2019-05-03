import { Dispatch } from "redux";
import { withFormik, WithFormikConfig } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { State } from "../redux/state";
import { ConfirmPrint } from "../components/pages/ConfirmPrint";
import { CarryOver } from "../models/CarryOver";
import { Examine } from "../models/Examine";
import { generateReport } from "../usecases/generateReport";
import { getCarryOver } from "../redux/selectors/getCarryOver";
import { getLatestExamine } from "../redux/selectors/getLatestExamine";

type Payload = {
  remaining: number;
  startsAt: Date;
  endsAt: Date;
};

function mapStateToProps(state: State) {
  return {
    carryOver: getCarryOver(state),
    beforeExamine: getLatestExamine(state)
  };
}
function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    async onSubmit({ remaining, startsAt, endsAt }: Payload) {
      dispatch(
        generateReport({
          remaining,
          startsAt,
          endsAt
        })
      );
    }
  };
}

const carryOverForm: WithFormikConfig<
  {
    carryOver: CarryOver | null;
    beforeExamine: Examine | null;
    onSubmit(values: Payload): any;
  },
  Payload
> = {
  isInitialValid(props) {
    const values = carryOverForm.mapPropsToValues!(props);
    return carryOverForm.validationSchema.isValidSync(values);
  },

  validationSchema: Yup.object().shape({
    startsAt: Yup.date().required(),
    endsAt: Yup.date().required(),
    remaining: Yup.number().integer()
  }),

  mapPropsToValues(props) {
    const { carryOver, beforeExamine } = props;
    return {
      remaining: carryOver ? carryOver.remaining : 0,
      startsAt: beforeExamine ? beforeExamine.examinedAt : 0,
      endsAt: new Date()
    };
  },

  handleSubmit(values, bag) {
    bag.setSubmitting(true);
    try {
      bag.props.onSubmit(values);
    } finally {
      bag.setSubmitting(false);
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFormik(carryOverForm)(ConfirmPrint));

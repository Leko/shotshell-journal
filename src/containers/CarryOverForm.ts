import { Dispatch } from "redux";
import { connect } from "react-redux";
import { NavigationScreenProps } from "react-navigation";
import { withFormik, WithFormikConfig } from "formik";
import * as Yup from "yup";
import { State } from "../redux/state";
import { CarryOverForm } from "../components/pages/CarryOverForm";
import { UnsavedCarryOver } from "../models/CarryOver";
import { UnsavedExamine } from "../models/Examine";
import { setCarryOver } from "../usecases/setCarryOver";
import { addExamine } from "../usecases/addExamine";

type CarryOverAndExamine = UnsavedCarryOver & UnsavedExamine;

function mapStateToProps(state: State) {
  return {};
}
function mapDispatchToProps(
  dispatch: Dispatch<any>,
  ownProps: NavigationScreenProps
) {
  return {
    async onSubmit(values: CarryOverAndExamine) {
      const { examinedAt, remaining } = values;
      await Promise.all([
        dispatch(setCarryOver({ remaining })),
        dispatch(addExamine({ examinedAt }))
      ]);
      ownProps.navigation.goBack();
    }
  };
}

const carryOverForm: WithFormikConfig<
  {
    onSubmit(values: CarryOverAndExamine): any;
  },
  CarryOverAndExamine
> = {
  isInitialValid(props) {
    const values = carryOverForm.mapPropsToValues!(props);
    return carryOverForm.validationSchema.isValidSync(values);
  },

  validationSchema: Yup.object().shape({
    examinedAt: Yup.date().required(),
    remaining: Yup.number().integer()
  }),

  mapPropsToValues() {
    return {
      remaining: 0,
      examinedAt: new Date()
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
)(withFormik(carryOverForm)(CarryOverForm));

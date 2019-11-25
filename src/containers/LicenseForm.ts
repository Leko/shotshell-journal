import { Dispatch } from "redux"
import { connect } from "react-redux"
import { NavigationScreenProps } from "react-navigation"
import { withFormik, WithFormikConfig } from "formik"
import * as Yup from "yup"
import { State } from "../redux/state"
import { LicenseForm } from "../components/pages/LicenseForm"
import { addLicense } from "../usecases/addLicense"
import { getLicenses } from "../redux/selectors/getLicenses"
import {
  UnsavedLicense,
  getUnlimitedExpiredAt,
  getLimitedExpiredAt,
} from "../models/License"

function mapStateToProps(state: State) {
  return {
    licenses: getLicenses(state),
  }
}

function mapDispatchToProps(
  dispatch: Dispatch<any>,
  ownProps: NavigationScreenProps
) {
  return {
    async onSubmit(values: UnsavedLicense) {
      await dispatch(addLicense(values))
      ownProps.navigation.goBack()
    },
  }
}

const licenseForm: WithFormikConfig<
  NavigationScreenProps<{ kind: UnsavedLicense["kind"] }> & {
    onSubmit(values: UnsavedLicense): any
  },
  UnsavedLicense
> = {
  isInitialValid(props) {
    const values = licenseForm.mapPropsToValues!(props)
    return licenseForm.validationSchema.isValidSync(values)
  },
  validationSchema: Yup.object().shape({
    kind: Yup.string().required(),
    gauge: Yup.number()
      .integer()
      .required(),
    purpose: Yup.string().required(),
    startsAt: Yup.date().required(),
    // FIXME: should be required
    amount: Yup.number().integer(),
    expiredAt: Yup.date(),
  }),

  mapPropsToValues(props) {
    const { navigation } = props

    const kind = navigation.getParam("kind", "limited")

    if (kind === "unlimited") {
      return {
        kind: "unlimited",
        purpose: "SHOOTING",
        gauge: 12,
        startsAt: new Date(),
        expiredAt: getUnlimitedExpiredAt(new Date()),
      }
    } else {
      return {
        kind: "limited",
        purpose: "SHOOTING",
        startsAt: new Date(),
        expiredAt: getLimitedExpiredAt(new Date()),
        amount: 100,
        gauge: 12,
      }
    }
  },

  handleSubmit(values, bag) {
    bag.setSubmitting(true)
    try {
      bag.props.onSubmit(values)
    } finally {
      bag.setSubmitting(false)
    }
  },
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFormik(licenseForm)(LicenseForm))

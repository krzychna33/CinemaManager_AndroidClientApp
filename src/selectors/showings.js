import moment from 'moment';

export default (showings) => {
    const now = moment().startOf('day');
    return showings.filter((showing) => {
        if(moment(showing.showingTime).isAfter(now, 'minute')){
            return showing;
        }
    })
}
/* global Redirectioni10n */
/**
 * External dependencies
 */

import React from 'react';
import { translate as __ } from 'lib/locale';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */

import RowActions from 'component/table/row-action';
import { setSelected, saveGroup, performTableAction } from 'state/group/action';
import { STATUS_COMPLETE } from 'state/settings/type';
import { getModuleName } from 'state/module/selector';

class GroupRow extends React.Component {
	constructor( props ) {
		super( props );

		this.state = { editing: false, name: props.item.name, moduleId: props.item.module_id };
		this.handleSelected = this.onSelected.bind( this );

		this.handleEdit = this.onEdit.bind( this );
		this.handleSave = this.onSave.bind( this );
		this.handleDelete = this.onDelete.bind( this );
		this.handleDisable = this.onDisable.bind( this );

		this.handleChange = this.onChange.bind( this );
		this.handleSelect = this.onSelect.bind( this );
	}

	componentWillUpdate( nextProps ) {
		if ( this.props.item.name !== nextProps.item.name ) {
			this.setState( { name: nextProps.item.name, moduleId: nextProps.item.module_id } );
		}
	}

	onEdit( ev ) {
		ev.preventDefault();
		this.setState( { editing: ! this.state.editing } );
	}

	onDelete( ev ) {
		ev.preventDefault();
		this.props.onTableAction( 'delete', this.props.item.id );
	}

	onDisable( ev ) {
		ev.preventDefault();
		this.props.onTableAction( 'disable', this.props.item.id );
	}

	onSelected() {
		this.props.onSetSelected( [ this.props.item.id ] );
	}

	onChange( ev ) {
		const { target } = ev;

		this.setState( { name: target.value } );
	}

	onSave( ev ) {
		this.onEdit( ev );
		this.props.onSaveGroup( this.props.item.id, this.state.name, this.state.moduleId );
	}

	onSelect( ev ) {
		const { target } = ev;

		this.setState( { moduleId: parseInt( target.value, 10 ) } );
	}

	renderLoader() {
		return (
			<div className="loader-wrapper">
				<div className="placeholder-loading loading-small" style={ { top: '0px' } }>
				</div>
			</div>
		);
	}

	renderActions() {
		const { id } = this.props.item;

		return (
			<RowActions>
				<a href="#" onClick={ this.handleEdit }>{ __( 'Edit' ) }</a> |&nbsp;
				<a href="#" onClick={ this.handleDelete }>{ __( 'Delete' ) }</a> |&nbsp;
				<a href={ Redirectioni10n.pluginRoot + '&id=' + id }>{ __( 'View Redirects' ) }</a> |&nbsp;
				<a href="#" onClick={ this.handleDisable }>{ __( 'Disable' ) }</a>
			</RowActions>
		);
	}

	renderEdit() {
		return (
			<table className="edit">
				<tbody>
					<tr>
						<th width="70">{ __( 'Name' ) }</th>
						<td><input type="text" name="name" value={ this.state.name } onChange={ this.handleChange } /></td>
					</tr>
					<tr>
						<th width="70">{ __( 'Module' ) }</th>
						<td>
							<select name="module_id" onChange={ this.handleSelect } value={ this.state.moduleId }>
								{ this.props.module.rows.map( item => <option key={ item.module_id } value={ item.module_id }>{ item.displayName }</option> ) }
							</select>
						</td>
					</tr>
					<tr>
						<th width="70"></th>
						<td>
							<div className="table-actions">
								<input className="button-primary" type="submit" name="save" value={ __( 'Save' ) } onClick={ this.handleSave } /> &nbsp;
								<input className="button-secondary" type="submit" name="cancel" value={ __( 'Cancel' ) } onClick={ this.handleEdit } />
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		);
	}

	getName( name, enabled ) {
		if ( enabled ) {
			return name;
		}

		return <strike>{ name }</strike>;
	}

	render() {
		const { name, redirects, id, module_id, enabled } = this.props.item;
		const { selected, isLoading, module } = this.props;

		return (
			<tr>
				<th scope="row" className="check-column">
					<input type="checkbox" name="item[]" value={ id } disabled={ isLoading } checked={ selected } onClick={ this.handleSelected } />
				</th>
				<td>
					{ ! this.state.editing && this.getName( name, enabled ) }
					{ this.state.editing ? this.renderEdit() : this.renderActions() }
				</td>
				<td>
					{ redirects }
				</td>
				<td>
					{ module.status === STATUS_COMPLETE ? getModuleName( module, module_id ) : this.renderLoader() }
				</td>
			</tr>
		);
	}
}

GroupRow.propTypes = {
	item: PropTypes.object.isRequired,
	selected: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool.isRequired,
};

function mapStateToProps( state ) {
	const { module } = state;

	return {
		module,
	};
}

function mapDispatchToProps( dispatch ) {
	return {
		onSetSelected: items => {
			dispatch( setSelected( items ) );
		},
		onSaveGroup: ( groupId, name, moduleId ) => {
			dispatch( saveGroup( groupId, name, moduleId ) );
		},
		onTableAction: ( action, ids ) => {
			dispatch( performTableAction( action, ids ) );
		},
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)( GroupRow );
